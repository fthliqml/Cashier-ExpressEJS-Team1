function showReviewPage(req, res) {
    try {
        res.render("pages/reviews", {
            layout: "layouts/main-layout",
            title: "Reviews",
            styleFile: "reviews.css",
            scriptFile: "reviews.js",
            currentPage: "reviews",
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

module.exports = { showReviewPage };
