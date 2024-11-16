const express = require('express');
const bodyParser = require('body-parser');
const quizRoutes = require('./config/routes'); // Import the merged routes file

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Routes (quiz and result routes are merged here)
app.use(quizRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Quiz app running on port ${port}`);
});
