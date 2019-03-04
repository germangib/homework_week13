// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// Your server.js file should require the basic npm packages we've used in class: express and path.
//
// ******************************************************************************

// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up path
var basename = path.basename(module.filename); 

// Requiring our database
var db = require("./app/data/friends.js");

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routing/apiRoutes.js")(app);
require("./routing/htmlRoutes.js")(app);

// Starts our server 
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });




