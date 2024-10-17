function showOrderPage(req, res) {
    try {
        // Rendering file with template engines (ejs)
        res.render("pages/order", {
            layout: "layouts/main-layout",
            title: "Order",
            styleFile: "order.css",
            scriptFile: "order.js",
            currentPage: "orders",
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

module.exports = { showOrderPage };
