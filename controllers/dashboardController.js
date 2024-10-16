function showDashboardPage(req, res) {
    try {
        // Rendering file with template engines (ejs)
        res.render("pages/dashboard", {
            layout: "layouts/main-layout",
            title: "Dashboard",
            styleFile: "dashboard.css",
            scriptFile: "dashboard.js",
            currentPage: "dashboard",
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

module.exports = { showDashboardPage };
