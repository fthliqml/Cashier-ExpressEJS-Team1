const { Customer } = require("../models");

async function showCustomerPage(req, res) {
  try {
    const customers = await Customer.findAll();
    res.render("pages/customers/index", {
      customers,
      layout: "layouts/main-layout",
      title: "Customers Page",
      styleFile: "customers.css",
      scriptFile: "customers.js",
      currentPage: "customers",
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
      styleFile: "customers.css",
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
    console.log("Request Body:", req.body);
    const { firstName, lastName, email, address } = req.body;

    const newCustomer = await Customer.create({
      firstName,
      lastName,
      email,
      address,
    });
    console.log("New Customer Created:", newCustomer);

    res.redirect("/customers");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failed",
      message: "Failed to create customer",
      isSuccess: false,
      error: error.message,
    });
  }
}

async function editCustomerPage(req, res) {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findByPk(customerId); // Mengambil data pelanggan berdasarkan ID

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
      styleFile: "customers.css",
      scriptFile: "customers.js",
      currentPage: "customers",
      customer: customer, // Mengirim data pelanggan untuk diisi di form
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

// Memproses pembaruan data pelanggan
async function updateCustomer(req, res) {
  try {
    const customerId = req.params.id;
    const { firstName, lastName, email, address } = req.body;

    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({
        status: "Failed",
        message: "Customer not found",
        isSuccess: false,
      });
    }

    // Memperbarui data pelanggan
    await customer.update({
      firstName,
      lastName,
      email,
      address,
    });

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
    const customer = await Customer.findByPk(customerId); // Mengambil data pelanggan berdasarkan ID

    if (!customer) {
      return res.status(404).json({
        status: "Failed",
        message: "Customer not found",
        isSuccess: false,
      });
    }

    // Menghapus data pelanggan
    await customer.destroy();

    res.redirect("/customers");
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to delete customer",
      isSuccess: false,
      error: error.message,
    });
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
const searchCustomerById = async (req, res) => {
  const customerId = req.query.id;

  try {
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res
        .status(404)
        .render("customers", { customers: [], message: "Customer not found" });
    }
    res.render("customers", { customers: [customer], message: null });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  showCustomerPage,
  createCustomerPage,
  createCustomer,
  editCustomerPage,
  updateCustomer,
  deleteCustomer,
  deleteCustomerPage,
  searchCustomerById,
};
