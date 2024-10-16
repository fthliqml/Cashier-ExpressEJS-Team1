// local date
const date = new Date();

// automatically added timestamp to request body (use this when create new model's object)
function createTimesamp(req, res, next) {
    req.body.createdAt = date;
    req.body.updatedAt = date;

    next();
}

module.exports = createTimesamp;
