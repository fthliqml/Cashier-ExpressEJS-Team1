const express = require("express");
const router = express.Router();

const { customerController } = require("../controllers");

router.get("/customers", customerController.showCustomerPage);
router.get("/customers/search", customerController.searchCustomerPage);
router.get("/customers/create", customerController.createCustomerPage);
router.post("/customers/create", customerController.createCustomer);
router.get("/customers/:id/edit", customerController.editCustomerPage);
router.post("/customers/:id/edit", customerController.updateCustomer);
router.get("/customers/delete/:id", customerController.deleteCustomerPage);
router.post("/customers/delete/:id", customerController.deleteCustomer);
router.get("/customers/:id", customerController.showCustomerDetails);
module.exports = router;
