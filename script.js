
const internships = [
    {
        title: "Frontend Developer Intern",
        company: "BrightTech",
        domain: "Web Development",
        duration: "2 Months"
    },
    {
        title: "Backend Developer Intern",
        company: "CodeWorks",
        domain: "Web Development",
        duration: "3 Months"
    },
    {
        title: "Data Analyst Intern",
        company: "DataSpark",
        domain: "Data Science",
        duration: "2 Months"
    },
    {
        title: "UI/UX Design Intern",
        company: "CreativeLabs",
        domain: "UI/UX Design",
        duration: "1 Month"
    }
];

const internshipList = document.getElementById("internshipList");
const searchInput = document.getElementById("search");
const domainFilter = document.getElementById("domainFilter");

function displayInternships() {
    const searchText = searchInput.value.toLowerCase();
    const selectedDomain = domainFilter.value;

    const filteredInternships = internships.filter(function(internship) {
        const matchesSearch =
            internship.title.toLowerCase().includes(searchText) ||
            internship.company.toLowerCase().includes(searchText);

        const matchesDomain =
            selectedDomain === "" || internship.domain === selectedDomain;

        return matchesSearch && matchesDomain;
    });

    internshipList.innerHTML = "";

    if (filteredInternships.length === 0) {
        internshipList.innerHTML = "<p>No internships found. Try another search.</p>";
        return;
    }

    filteredInternships.forEach(function(internship) {
        const card = document.createElement("article");
        card.className = "internship-card";

        card.innerHTML = `
            <h3>${internship.title}</h3>
            <p><strong>Company:</strong> ${internship.company}</p>
            <p><strong>Domain:</strong> ${internship.domain}</p>
            <p><strong>Duration:</strong> ${internship.duration}</p>
        `;

        internshipList.appendChild(card);
    });
}

searchInput.addEventListener("input", displayInternships);
domainFilter.addEventListener("change", displayInternships);

displayInternships();