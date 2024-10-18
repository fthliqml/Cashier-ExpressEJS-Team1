const { Customer } = require("../models");

async function showCustomerPage(req, res) {
  try {
    const customers = await Customer.findAll();
    res.render("pages/customers/index", {
      customers,
      layout: "layouts/main-layout",
      title: "Customers Page",
      styleFile: "customers.css",
      scriptFile: "customers.js",
      currentPage: "customers",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failed",
      message: "Failed to show page",
      isSuccess: false,
      error: error.message,
    });
  }
}
async function createCustomerPage(req, res) {
  try {
    res.render("pages/customers/create", {
      layout: "layouts/main-layout",
      title: "Customers Create Page",
      styleFile: "customers.css",
      scriptFile: "customers.js",
      currentPage: "customers",
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to create show page",
      isSuccess: false,
      error: error.message,
    });
  }
}

async function createCustomer(req, res) {
  try {
    console.log("Request Body:", req.body);
    const { firstName, lastName, email, address } = req.body;

    const newCustomer = await Customer.create({
      firstName,
      lastName,
      email,
      address,
    });
    console.log("New Customer Created:", newCustomer);

    res.redirect("/customers");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failed",
      message: "Failed to create customer",
      isSuccess: false,
      error: error.message,
    });
  }
}

module.exports = { showCustomerPage, createCustomerPage, createCustomer };
