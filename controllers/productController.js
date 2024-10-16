function showProductPage(req, res) {
    try {
        // Rendering file with template engines (ejs)
        res.render("pages/products", {
            layout: "layouts/main-layout",
            title: "Products",
            styleFile: "products.css",
            scriptFile: "products.js",
            currentPage: "products",
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

module.exports = { showProductPage };
