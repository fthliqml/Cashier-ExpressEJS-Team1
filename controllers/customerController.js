const { Customer } = require("../models");

async function showCustomerPage(req, res) {
  try {
    const customers = await Customer.findAll();
     res.render("pages/customers", {
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

module.exports = { showCustomerPage };
