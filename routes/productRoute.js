const express = require("express");
const router = express.Router();

const { productController } = require("../controllers");

router.get("/products", productController.showProductPage);
router.get("/products/create", productController.createProductPage);
router.post("/products/create", productController.createProduct);

module.exports = router;
