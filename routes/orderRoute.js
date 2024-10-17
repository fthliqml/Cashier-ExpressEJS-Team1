const express = require("express");
const router = express.Router();

const { orderController } = require("../controllers");

router.get("/orders", orderController.showOrderPage);

module.exports = router;
