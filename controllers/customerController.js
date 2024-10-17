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
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Failed",
      message: "Failed to show page",
      isSuccess: false,
      error: err.message,
    });
  }
}
async function createCustomerPage(req, res) {
  try {
    res.render("pages/customers/customers", {
      layout: "layouts/main-layout",
      title: "Customers Create Page",
      styleFile: "customers.css",
      scriptFile: "customers.js",
      currentPage: "customers",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Failed",
      message: "Failed to create show page",
      isSuccess: false,
      error: err.message,
    });
  }
}

module.exports = { showCustomerPage, createCustomerPage };
