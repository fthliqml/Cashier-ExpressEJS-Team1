const express = require("express");
const router = express.Router();

const { orderController } = require("../controllers");

router.get("/orders", orderController.showOrderPage);
router.get("/orders/create", orderController.createPage);
router.post("/orders/create", orderController.createPage);
router.post("/orders/delete/:id", orderController.deleteOrder);

module.exports = router;
