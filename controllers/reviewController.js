const { Review, Customer, Product, Order } = require("../models");

async function showReviewPage(req, res) {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: Customer,
          as: "customer",
        },
        {
          model: Product,
          as: "product",
        },
      ],
    });
    console.log(reviews)

    const customers = await Customer.findAll({
      attributes: ["id", "firstName", "lastName"],
    });
    const products = await Product.findAll({
      attributes: ["id", "name"],
    });

    // GET flash messages
    let type;
    let message = null;
    const deleteMsg = req.flash("delete");
    const updateMsg = req.flash("update");

    if (deleteMsg.length !== 0 || updateMsg.length !== 0) {
      type = deleteMsg.length === 0 ? "success" : "danger";
      message = deleteMsg.length === 0 ? updateMsg : deleteMsg;
    }

    res.render("pages/reviews", {
      layout: "layouts/main-layout",
      title: "Reviews",
      styleFile: "reviews/reviews.css",
      scriptFile: "reviews.js",
      currentPage: "reviews",
      reviews,
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

async function getDetailReview(res, req) {
  try {
    const id = req.params.id;
    const review = await Review.findByPk(id, {
      include: [
        {
          model: Customer,
          as: "customer",
        },
        {
          model: Product,
          as: "product",
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
    console.error(error);
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

async function updateReview(req, res) {
  const id = req.params.id;
  const { customer_id, product_id, rating, comment } = req.body;

  try {
    const review = await Review.findByPk(id);

    const isDataUnchanged =
      review.customer_id == customer_id &&
      review.product_id == product_id &&
      review.rating == Number(rating) &&
      review.comment === comment;

    if (isDataUnchanged) {
      return res.redirect("/reviews");
    }

    const newReview = {
      customer_id,
      product_id,
      rating,
      comment
    };

    await review.update(newReview);
    req.flash("update", "Successfully updated review data!");
    res.redirect("/reviews");

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failed",
      message: "Failed to update review data",
      isSuccess: false,
      error: error.message,
    });
  }
}

async function deleteReview(req, res) {
  try {
    const id = req.params.id;
    const review = await Review.findByPk(id);
    if (!review) {
      console.error(error);
      res.status(500).json({
        status: "Failed",
        message: `Failed to get review by id: ${id}`,
        isSuccess: false,
        error: error.message,
      });
    }

    await review.destroy();
    req.flash("delete", "Successfully deleted review data!");
    res.redirect("/reviews");

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failed",
      message: "Failed to delete review data",
      isSuccess: false,
      error: error.message,
    });
  }
}

module.exports = {
  showReviewPage,
  getDetailReview,
  createReview,
  chooseOrderReviewPage,
  createReviewPage,
  updateReview,
  deleteReview
};
