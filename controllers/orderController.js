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
      order: [["id", "ASC"]],
    });

    // Data for update
    const customers = await Customer.findAll({
      attributes: ["id", "firstName", "lastName"],
    });

    const products = await Product.findAll({
      attributes: ["id", "name", "price"],
    });

    // Get information message if there is flash sending in request
    let type;
    let message = null;
    const deleteMsg = req.flash("delete");
    const updateMsg = req.flash("update");

    if (deleteMsg.length !== 0 || updateMsg.length !== 0) {
      // if delete message is empty, then type = success
      type = deleteMsg.length === 0 ? "success" : "danger";
      // if delete message is empty, then message = updateMsg
      message = deleteMsg.length === 0 ? updateMsg : deleteMsg;
    }

    // Rendering file with template engines (ejs)
    res.render("pages/orders", {
      layout: "layouts/main-layout",
      title: "Order",
      styleFile: "orders/order.css",
      scriptFile: "orders/order.js",
      currentPage: "orders",
      orders,
      customers,
      products,
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

async function updateOrder(req, res) {
  const id = req.params.id;
  const { customer_id, product_id, quantity } = req.body;

  try {
    const product = await Product.findByPk(product_id, {
      attributes: ["price"],
    });
    const order = await Order.findByPk(id);

    const totalPrice = product.price * quantity;

    const isDataUnchanged =
      order.customer_id == customer_id &&
      order.product_id == product_id &&
      order.quantity == quantity &&
      order.totalPrice == totalPrice;

    if (isDataUnchanged) {
      return res.redirect("/orders");
    }

    const newOrder = {
      customer_id,
      product_id,
      quantity,
      totalPrice,
    };

    await order.update(newOrder);

    req.flash("update", "Successfully updated order data !");

    res.redirect("/orders");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failed",
      message: "Failed to update order",
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
      scriptFile: "orders/create.js",
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
    req.flash("update", "Successfully created order data !");
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
    req.flash("delete", "Successfully deleted order data !");

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
  updateOrder,
  createPage,
  createOrder,
  deleteOrder,
};
