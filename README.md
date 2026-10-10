# EdVyro Internship Board

A responsive internship board with a REST API built using Node.js, Express.js, and SQLite.

## Features

- REST API for internship records
- Retrieve all internships with pagination
- Retrieve a single internship by ID
- Add internships using POST requests
- Validate required fields
- Store internship data persistently using SQLite
- Responsive frontend internship board

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- SQLite with better-sqlite3
- Axios for API testing

## Installation

1. Install Node.js.
2. Clone or download this repository.
3. Open the project folder in the terminal.
4. Install dependencies:

   `npm install`

5. Start the API server:

   `npm start`

6. Open `http://localhost:3001` in your browser.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check server status |
| GET | `/api/internships` | Get internships with pagination |
| GET | `/api/internships/:id` | Get one internship by ID |
| POST | `/api/internships` | Add a new internship |

## Pagination Example

`http://localhost:3001/api/internships?page=1&limit=10`

The response includes the current page, limit, total records, total pages, and internship data.

## Add an Internship

Send a POST request to `/api/internships` with JSON data:

```json
{
  "title": "Backend Developer Intern",
  "company": "Example Company",
  "domain": "Web Development",
  "location": "Remote"
}
```

All four fields are required.

## Database

Internship records are stored in a local SQLite database file named `internships.db`. The database and its records persist when the server restarts.

## Run the Validation Test

With the API server running in another terminal, run:

`node test-api.js`

This checks that incomplete internship data is rejected.

## Author

Developed as part of the EdVyro Full Stack Development Internship.