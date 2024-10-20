const { Product } = require("../models");

function showProductPage(req, res) {
  try {
    // Rendering file with template engines (ejs)
    res.render("pages/products", {
      layout: "layouts/main-layout",
      title: "Products",
      styleFile: "products.css",
      scriptFile: "products.js",
      currentPage: "products",
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

async function createProduct(req, res) {
  const { name, price, stock, description } = req.body;
  try {
    await Product.create({ name, price, stock, description });
    res.redirect("/products");
  } catch (error) {
    console.error(error.message);
    res.redirect("/products/create");
  }
}

async function createProductPage(req, res) {
  try {
    res.render("pages/products/create", {
      layout: "layouts/main-layout",
      title: "Add Product",
      styleFile: "products.css",
      scriptFile: "products.js",
      currentPage: "products",
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

async function updateProduct(req, res) {
  const product = await Product.findByPk(req.params.id);
  const { name, price, stock, description } = req.body;
  try {
    await Product.update(
      { name, price, stock, description },
      {
        where: { id: product.id },
      }
    );
    res.redirect("/products");
  } catch (error) {
    console.error(error.message);
    res.redirect(`/products/update/${product.id}`);
  }
}

async function updateProductPage(req, res) {
  const product = await Product.findByPk(req.params.id);
  try {
    res.render("pages/products/update", {
      product: product,
      layout: "layouts/main-layout",
      title: "Add Product",
      styleFile: "products.css",
      scriptFile: "products.js",
      currentPage: "products",
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
  showProductPage,
  createProductPage,
  createProduct,
  updateProductPage,
  updateProduct,
};
