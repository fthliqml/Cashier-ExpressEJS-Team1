function showCustomerPage(req, res) {
  try {
    res.render("pages/customers", {
      layout: "layouts/main-layout",
      title: "Customers",
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
