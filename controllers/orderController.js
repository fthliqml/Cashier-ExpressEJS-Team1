const { Order, Customer, Product } = require("../models");

async function showOrderPage(req, res) {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["firstName", "lastName", "email"],
        },
        {
          model: Product,
          as: "product",
          attributes: ["name", "price"],
        },
      ],
    });

    // Rendering file with template engines (ejs)
    res.render("pages/orders", {
      layout: "layouts/main-layout",
      title: "Order",
      styleFile: "orders/order.css",
      scriptFile: "orders/order.js",
      currentPage: "orders",
      orders,
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

async function getDetailOrder(req, res) {
  try {
    const id = req.params.id;
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["firstName", "lastName", "email", "address"],
        },
        {
          model: Product,
          as: "product",
          attributes: ["name", "price", "description"],
        },
      ],
    });

    if (!order) {
      throw new Error("Can't find spesific id");
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully obtained detail data",
      isSuccess: true,
      data: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failed",
      message: "Failed to get detail data",
      isSuccess: false,
      error: error.message,
    });
  }
}

async function createPage(req, res) {
  const customers = await Customer.findAll();
  const products = await Product.findAll();
  try {
    res.render("pages/orders/create", {
      layout: "layouts/main-layout",
      title: "Order",
      styleFile: "orders/create.css",
      scriptFile: "",
      currentPage: "orders",
      customers,
      products,
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

async function createOrder(req, res) {
  const { customer, product, quantity } = req.body;
  const theProduct = await Product.findByPk(product);
  const price = theProduct.dataValues.price * quantity;
  const newOrder = {
    customer_id: customer,
    product_id: product,
    quantity: quantity,
    totalPrice: price,
  };

  try {
    await Order.create(newOrder);
    res.redirect("/orders");
  } catch (error) {
    console.error(error);
    res.render("error", {
      message: error.message,
    });
  }
}

async function deleteOrder(req, res) {
  try {
    const id = req.params.id;
    const order = await Order.findByPk(id);
    if (!order) {
      console.error(error);
      res.status(500).json({
        status: "Failed",
        message: `Failed to get order by id: ${id}`,
        isSuccess: false,
        error: error.message,
      });
    }

    await order.destroy();

    res.redirect("/orders");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failed",
      message: "Failed to delete order data",
      isSuccess: false,
      error: error.message,
    });
  }
}

module.exports = {
  showOrderPage,
  getDetailOrder,
  createPage,
  createOrder,
  deleteOrder,
};
