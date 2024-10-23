const { Review, Customer, Product, Order } = require("../models");

async function showReviewPage(req, res) {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["firstName", "lastName"],
        },
        {
          model: Product,
          as: "product",
          attributes: ["name"],
        },
      ],
    });
    res.render("pages/reviews", {
      layout: "layouts/main-layout",
      title: "Reviews",
      styleFile: "reviews.css",
      scriptFile: "reviews.js",
      currentPage: "reviews",
      reviews,
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

async function getDetailReview(res, req) {
  try {
    const id = req.params.id;
    const review = await Review.findByPK(id, {
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

    if (!review) {
      throw new Error("Can't find spesific id");
    }

    res.status(200).json({
      status: "Success",
      message: "Sucessfully get review data!",
      isSuccess: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Failed get review data!",
      isSuccess: false,
      error: error.message,
    });
  }
}

async function chooseOrderReviewPage(req, res) {
  const orders = await Order.findAll();

  try {
    res.render("pages/reviews/chooseOrder", {
      layout: "layouts/main-layout",
      title: "Review",
      styleFile: "reviews/create.css",
      scriptFile: "reviews/create.js",
      currentPage: "reviews",
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

async function createReviewPage(req, res) {
  const orderId = req.body.order;
  const order = await Order.findByPk(orderId, {
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

  try {
    res.render("pages/reviews/create", {
      layout: "layouts/main-layout",
      title: "Review",
      styleFile: "reviews/create.css",
      scriptFile: "reviews/create.js",
      currentPage: "reviews",
      order: order.dataValues,
      customer: order.dataValues.customer.dataValues,
      product: order.dataValues.product.dataValues,
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

async function createReview(req, res) {
  const { customerId, productId, rating, comment } = req.body;

  const newReview = {
    customer_id: customerId,
    product_id: productId,
    rating,
    comment,
  };

  try {
    await Review.create(newReview);
    req.flash("update", "Successfully created order data !");
    res.redirect("/reviews");
  } catch (error) {
    console.error(error);
    res.render("error", {
      message: error.message,
    });
  }
}

module.exports = {
  showReviewPage,
  getDetailReview,
  createReview,
  chooseOrderReviewPage,
  createReviewPage,
};
