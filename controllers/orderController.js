function showOrderPage(req, res) {
  try {
    // Rendering file with template engines (ejs)
    res.render("pages/orders", {
      layout: "layouts/main-layout",
      title: "Order",
      styleFile: "orders/order.css",
      scriptFile: "order.js",
      currentPage: "orders",
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

async function createPage(req, res) {
  try {
    res.render("pages/orders/create", {
      layout: "layouts/main-layout",
      title: "Order",
      styleFile: "orders/create.css",
      scriptFile: "",
      currentPage: "orders",
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

module.exports = {
  showOrderPage,
  createPage,
};
