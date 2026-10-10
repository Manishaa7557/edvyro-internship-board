
const axios = require("axios");

async function testValidation() {
  try {
    await axios.post("http://localhost:3001/api/internships", {
      title: "Test Intern"
    });
  } catch (error) {
    console.log("Status:", error.response.status);
    console.log("Message:", error.response.data.message);
  }
}

testValidation();
