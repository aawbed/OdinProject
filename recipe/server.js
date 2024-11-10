const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./recipe');  // Import database functions
const app = express();

app.use(cors()); // Allow all origins

// OR specify the origin explicitly
app.use(cors({ 
    origin: 'http://127.0.0.1:5501', // Replace this with the origin of your frontend
    methods: ['GET', 'POST'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  }));

// Your route handlers
app.post('/add-recipe', (req, res) => {
  // Handle the request
});
app.options('*', cors()); // Allow preflight requests for all routes


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/add-recipe', (req, res) => {
    const { name, ingredients, directions } = req.body;
    db.insertRecipe(name, ingredients, directions);
    res.send("Recipe added successfully!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
