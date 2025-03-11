require('dotenv').config();
const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000; // Ensure you're using one port only

app.use(express.static('static')); // Serve static files

// Serve the HTML file for the base route
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// Handle conditional route logic based on environment variable
app.get('/data', (req, res) => {
  if (process.env.IS_ADMIN === 'true') {
    res.send({ message: "Welcome, Admin!", data: ["Admin Data 1", "Admin Data 2"] });
  } else {
    res.send({ message: "Welcome, User!", data: ["User Data 1", "User Data 2"] });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Log admin or user access to the console
const isAdmin = process.env.IS_ADMIN === 'true';
if (isAdmin) {
  console.log("Admin privileges granted.");
} else {
  console.log("Access restricted. Admin only.");
}
   