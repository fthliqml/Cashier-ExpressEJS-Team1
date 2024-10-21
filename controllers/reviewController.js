const { Review, Customer, Product } = require("../models");

async function showReviewPage(req, res) {
    try {
        const reviews = await Review.findAll({
            include: [
                {
                    model: Customer,
                    as: "customer",
                    attributes: ["firstName", "lastName"],
                },
                {
                    model: Product,
                    as: "product",
                    attributes: ["name"],
                },
            ]
        });
        res.render("pages/reviews", {
            layout: "layouts/main-layout",
            title: "Reviews",
            styleFile: "reviews.css",
            scriptFile: "reviews.js",
            currentPage: "reviews",
            reviews
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

async function getDetailReview(res, req) {
    try {
        const id = req.params.id;
        const review = await Review.findByPK(id, {
            include: [
                {
                    model: Customer,
                    as: "customer",
                    attributes: ["firstName", "lastName", "email", "address"],
                },
                {
                    model: Product,
                    as: "product",
                    attributes: ["name", "price", "description"],
                },
            ]
        });

        if (!review) {
            throw new Error("Can't find spesific id");
        }

        res.status(200).json({
            status: "Success",
            message: "Sucessfully get review data!",
            isSuccess: true,
            data: review
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed get review data!",
            isSuccess: false,
            error: error.message
        })
    }
}

module.exports = {
    showReviewPage,
    getDetailReview
};
