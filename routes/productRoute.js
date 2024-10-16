const express = require("express");
const router = express.Router();

const { productController } = require("../controllers");

router.get("/products", productController.showProductPage);

module.exports = router;
