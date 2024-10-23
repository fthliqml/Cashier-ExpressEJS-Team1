const { Product } = require("../models");

async function showProductPage(req, res) {
  try {
    // Rendering file with template engines (ejs)
    const products = await Product.findAll();
    console.log(products);

    // Get flash messages
    let type = null;
    let message = null;

    const deleteMsg = req.flash("delete");
    const updateMsg = req.flash("update");

    if (deleteMsg.length !== 0) {
      type = "success";
      message = deleteMsg;
    } else if (updateMsg.length !== 0) {
      type = "success";
      message = updateMsg;
    }

    res.render("pages/products", {
      products,
      layout: "layouts/main-layout",
      title: "Products",
      styleFile: "products.css",
      scriptFile: "products.js",
      currentPage: "products",
      alert: {
        type,
        message,
      },
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

async function searchProductPage(req, res) {
  try {
    const id = req.query.id;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).render("pages/products/search", {
        layout: "layouts/main-layout",
        title: "Product Not Found",
        product: null,
        styleFile: "products/index.css",
        scriptFile: "products.js",
        currentPage: "products",
        message: "Product not found",
      });
    }

    res.render("pages/products/search", {
      layout: "layouts/main-layout",
      styleFile: "products/index.css",
      scriptFile: "products.js",
      currentPage: "products",
      title: "Product Details",
      product,
      message: null,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function createProduct(req, res) {
  const { name, price, stock, description } = req.body;
  try {
    await Product.create({ name, price, stock, description });
    req.flash("update", "Product created Successfully!");
    res.redirect("/products");
  } catch (error) {
    console.error(error.message);
    req.flash("update", "Failed to created Product");
    res.redirect("/products/create");
  }
}

async function createProductPage(req, res) {
  try {
    res.render("pages/products/create", {
      layout: "layouts/main-layout",
      title: "Add New Product",
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
    req.flash("update", "Product updated successfully!");
    res.redirect("/products");
  } catch (error) {
    console.error(error.message);
    req.flash("update", "Product update failed!");
    res.redirect(`/products/update/${product.id}`);
  }
}

async function updateProductPage(req, res) {
  const product = await Product.findByPk(req.params.id);
  try {
    res.render("pages/products/update", {
      product: product,
      layout: "layouts/main-layout",
      title: "Update Product",
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

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product) {
      req.flash("delete", "products not found");
      return res.redirect("/products");
    }

    await product.destroy();
    req.flash("delete", "Successfully deleted product data !");
    res.redirect("/products");
  } catch (error) {
    req.flash("error", "Failed to delete product");
    res.redirect("/products");
  }
};

async function deleteProductPage(req, res) {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        status: "Failed",
        message: "Product not found",
        isSuccess: false,
      });
    }

    res.render("pages/products/delete", {
      layout: "layouts/main-layout",
      title: "Delete Product",
      styleFile: "",
      scriptFile: "",
      currentPage: "",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failed",
      message: "Failed to show delete page",
      isSuccess: false,
      error: error.message,
    });
  }
}

module.exports = {
  showProductPage,
  searchProductPage,
  createProductPage,
  createProduct,
  updateProductPage,
  updateProduct,
  deleteProduct,
  deleteProductPage,
};
