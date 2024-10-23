const { Customer } = require("../models");

async function showCustomerPage(req, res) {
  try {
    const customers = await Customer.findAll({ order: [["id", "ASC"]] });

    // Get flash messages
    let type = null;
    let message = null;

    const deleteMsg = req.flash("delete");
    const updateMsg = req.flash("update");

    if (deleteMsg.length !== 0) {
      type = "success";
      message = deleteMsg;
    } else if (updateMsg.length !== 0) {
      type = "success";
      message = updateMsg;
    }

    res.render("pages/customers/index", {
      customers,
      layout: "layouts/main-layout",
      title: "Customers List",
      styleFile: "customers/index.css",
      scriptFile: "customers.js",
      currentPage: "customers",
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

async function createCustomerPage(req, res) {
  try {
    res.render("pages/customers/create", {
      layout: "layouts/main-layout",
      title: "Customers Create Page",
      styleFile: "customers/index.css",
      scriptFile: "customers.js",
      currentPage: "customers",
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to create show page",
      isSuccess: false,
      error: error.message,
    });
  }
}

async function createCustomer(req, res) {
  try {
    const { firstName, lastName, email, address } = req.body;

    const newCustomer = await Customer.create({
      firstName,
      lastName,
      email,
      address,
    });
    req.flash("update", "Customer created Successfully!");
    res.redirect("/customers");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failed",
      message: "Failed to create customer",
      isSuccess: false,
      error: error.message,
    });
    req.flash("update", "Failed to created customer");
    res.redirect("/customers");
  }
}

async function editCustomerPage(req, res) {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({
        status: "Failed",
        message: "Customer not found",
        isSuccess: false,
      });
    }

    res.render("pages/customers/edit", {
      layout: "layouts/main-layout",
      title: "Edit Customer Page",
      styleFile: "customers/index.css",
      scriptFile: "customers.js",
      currentPage: "customers",
      customer: customer,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to show edit page",
      isSuccess: false,
      error: error.message,
    });
  }
}

async function updateCustomer(req, res) {
  try {
    const customerId = req.params.id;
    const { firstName, lastName, email, address } = req.body;

    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      req.flash("update", "Customer update failed!");
      return res.status(404).json({
        status: "Failed",
        message: "Customer not found",
        isSuccess: false,
      });
    }

    await customer.update({
      firstName,
      lastName,
      email,
      address,
    });

    req.flash("update", "Customer updated successfully!");
    res.redirect("/customers");
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to update customer",
      isSuccess: false,
      error: error.message,
    });
  }
}

async function deleteCustomer(req, res) {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      req.flash("delete", "Customer not found");
      return res.redirect("/customers");
    }

    await customer.destroy();
    req.flash("delete", "Customer deleted successfully!");
    res.redirect("/customers");
  } catch (error) {
    req.flash("error", "Failed to delete customer");
    res.redirect("/customers");
  }
}

async function deleteCustomerPage(req, res) {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({
        status: "Failed",
        message: "Customer not found",
        isSuccess: false,
      });
    }

    res.render("pages/customers/delete", {
      layout: "layouts/main-layout",
      title: "Delete Customer",
      styleFile: "",
      scriptFile: "",
      currentPage: "",
      customer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failed",
      message: "Failed to show delete page",
      isSuccess: false,
      error: error.message,
    });
  }
}
async function searchCustomerPage(req, res) {
  const customerId = req.query.id;
  try {
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).render("pages/customers/search", {
        layout: "layouts/main-layout",
        title: "Customer Not Found",
        customer: null,
        styleFile: "customers/index.css",
        scriptFile: "customers.js",
        currentPage: "customers",
        message: "Customer not found",
      });
    }

    res.render("pages/customers/search", {
      layout: "layouts/main-layout",
      styleFile: "customers/index.css",
      scriptFile: "customers.js",
      currentPage: "customers",
      title: "Customer Details",
      customer,
      message: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  showCustomerPage,
  createCustomerPage,
  createCustomer,
  editCustomerPage,
  updateCustomer,
  deleteCustomer,
  deleteCustomerPage,
  searchCustomerPage,
};
