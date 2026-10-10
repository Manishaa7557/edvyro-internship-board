
const express = require("express");
const Database = require("better-sqlite3");

const app = express();
const PORT = 3001;

app.use(express.json());

const db = new Database("internships.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS internships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    domain TEXT NOT NULL,
    location TEXT NOT NULL
  )
`);

const count = db.prepare("SELECT COUNT(*) AS total FROM internships").get();

if (count.total === 0) {
  const insert = db.prepare(`
    INSERT INTO internships (title, company, domain, location)
    VALUES (?, ?, ?, ?)
  `);

  insert.run("Frontend Developer Intern", "ABC Technologies", "Web Development", "Remote");
  insert.run("Data Science Intern", "XYZ Solutions", "Data Science", "Chennai");
}

app.get("/", (req, res) => {
  res.send("Internship API is running!");
});

app.get("/api/internships", (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const offset = (page - 1) * limit;

  const total = db.prepare("SELECT COUNT(*) AS total FROM internships").get().total;
  const data = db.prepare(
    "SELECT * FROM internships ORDER BY id LIMIT ? OFFSET ?"
  ).all(limit, offset);

  res.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data
  });
});

app.get("/api/internships/:id", (req, res) => {
  const item = db.prepare("SELECT * FROM internships WHERE id = ?").get(Number(req.params.id));

  if (!item) {
    return res.status(404).json({ message: "Internship not found" });
  }

  res.json(item);
});

app.post("/api/internships", (req, res) => {
  const { title, company, domain, location } = req.body || {};

  if (![title, company, domain, location].every(
    value => typeof value === "string" && value.trim()
  )) {
    return res.status(400).json({
      message: "Title, company, domain and location are required"
    });
  }

  const result = db.prepare(`
    INSERT INTO internships (title, company, domain, location)
    VALUES (?, ?, ?, ?)
  `).run(title.trim(), company.trim(), domain.trim(), location.trim());

  const item = db.prepare("SELECT * FROM internships WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(item);
});

app.put("/api/internships/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, company, domain, location } = req.body || {};

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "Invalid internship ID" });
  }

  if (![title, company, domain, location].every(
    value => typeof value === "string" && value.trim()
  )) {
    return res.status(400).json({
      message: "Title, company, domain and location are required"
    });
  }

  const existing = db.prepare(
    "SELECT * FROM internships WHERE id = ?"
  ).get(id);

  if (!existing) {
    return res.status(404).json({ message: "Internship not found" });
  }

  db.prepare(`
    UPDATE internships
    SET title = ?, company = ?, domain = ?, location = ?
    WHERE id = ?
  `).run(title.trim(), company.trim(), domain.trim(), location.trim(), id);

  const updated = db.prepare(
    "SELECT * FROM internships WHERE id = ?"
  ).get(id);

  res.json(updated);
});

app.delete("/api/internships/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "Invalid internship ID" });
  }

  const result = db.prepare(
    "DELETE FROM internships WHERE id = ?"
  ).run(id);

  if (result.changes === 0) {
    return res.status(404).json({ message: "Internship not found" });
  }

  res.status(200).json({ message: "Internship deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
