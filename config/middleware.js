const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const router = require("../routes");

module.exports = (app) => {
    // Reading static files in spesific folder
    app.use(express.static(__dirname + "/../public"));
    // Reading json request from client
    app.use(express.json());
    // Get request object (in this case, form in createCar)
    app.use(
        express.urlencoded({
            extended: false,
        })
    );
    // Override method in form element
    app.use(methodOverride("_method"));
    // Set the view engine to ejs
    app.set("view engine", "ejs");
    // Using template engine
    app.use(expressLayouts);
    // Routing
    app.use(router);
};
