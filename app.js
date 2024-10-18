require("dotenv").config();
const express = require("express");

const configureMiddleware = require("./config/middleware");
const customerRoutes = require("./routes/customerRoute");
const productRoutes = require("./routes/productRoute");
const { productController } = require("./controllers");

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

//ROUTER
app.use("/customers", customerRoutes);
app.use("/products", productRoutes);

const PORT = process.env.PORT_NUMBER;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
