const { Customer } = require("../models");

const customerPage = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.render("customers/index.ejs", {
      customers,
      message: req.flash("message", ""),
    });
  } catch (err) {
    res.render("error.ejs", { message: err.message });
  }
};

const createCustomerPage = (req, res) => {
  res.render("customers/create.ejs");
};

const createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, address } = req.body;
    await Customer.create({ firstName, lastName, email, address });
    req.flash("message", "Customer added successfully!");
    res.redirect("/customers");
  } catch (err) {
    console.error(err.message);
    req.flash("error", "Failed to add customer");
    res.redirect("/customers/create");
  }
};

const editCustomerPage = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    res.render("customers/edit.ejs", { customer });
  } catch (err) {
    res.render("error.ejs", { message: err.message });
  }
};

const editCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, address } = req.body;
    await Customer.update(
      { firstName, lastName, email, address },
      {
        where: { id: req.params.id },
      }
    );
    req.flash("message", "Customer updated successfully!");
    res.redirect("/customers");
  } catch (err) {
    res.render("error.ejs", { message: err.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    await Customer.destroy({ where: { id: req.params.id } });
    req.flash("message", "Customer deleted successfully!");
    res.redirect("/customers");
  } catch (err) {
    res.render("error.ejs", { message: err.message });
  }
};

module.exports = {
  customerPage,
  createCustomerPage,
  createCustomer,
  editCustomerPage,
  editCustomer,
  deleteCustomer,
};
