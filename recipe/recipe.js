let mysql = require('mysql');
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password",
    database: "recipedb"  // Updated to use the created database
});

con.connect(function(err) {
    if (err) { throw err; }
    console.log("Connected to the database");

    // Create table if it doesn't exist
    let createTableQuery = `
        CREATE TABLE IF NOT EXISTS recipes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            ingredients TEXT,
            directions TEXT
        )
    `;
    con.query(createTableQuery, function(err, result) {
        if (err) { throw err; }
        console.log("Recipes table is ready");
    });
});

// Function to insert a recipe into the database
function insertRecipe(name, ingredients, directions) {
    let sql = "INSERT INTO recipes (name, ingredients, directions) VALUES ?";
    let values = [[name, ingredients, directions]];
    con.query(sql, [values], function(err, result) {
        if (err) { throw err; }
        console.log("Recipe inserted:", result);
    });
}

// Function to select all recipes from the database
function getRecipes() {
    con.query("SELECT * FROM recipes", function(err, result, fields) {
        if (err) { throw err; }
        console.log("Recipes:", result);
    });
}

// Function to update a recipe by ID
function updateRecipe(id, name, ingredients, directions) {
    let sql = `UPDATE recipes SET name = ?, ingredients = ?, directions = ? WHERE id = ?`;
    con.query(sql, [name, ingredients, directions, id], function(err, result) {
        if (err) { throw err; }
        console.log("Recipe updated:", result);
    });
}

module.exports = { insertRecipe, getRecipes, updateRecipe };
