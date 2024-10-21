require("dotenv").config();
const express = require("express");

const configureMiddleware = require("./config/middleware");
<<<<<<< HEAD
const customerRoutes = require("./routes/customerRoute");
const productRoutes = require("./routes/productRoute");
const { productController } = require("./controllers");
=======
>>>>>>> 01693c760d05bcf0ba78c2595598ff4f541f93ee

const app = express();

// Middleware is defined here
configureMiddleware(app);

// health check
app.get("/", (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      message: "Ping successfully",
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Ping failed",
      isSuccess: false,
      error: error.message,
    });
  }
});

<<<<<<< HEAD
//ROUTER
app.use("/customers", customerRoutes);
app.use("/products", productRoutes);

=======
>>>>>>> 01693c760d05bcf0ba78c2595598ff4f541f93ee
const PORT = process.env.PORT_NUMBER;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
