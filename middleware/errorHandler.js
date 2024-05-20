const { errorStatus } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;

    switch (statusCode) {
        case errorStatus.VALIDATION_ERROR:
            res.json({
                title: "Validation failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case errorStatus.NOT_FOUND:
            res.json({
                title: "Not found",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case errorStatus.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case errorStatus.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case errorStatus.SERVER_ERROR:
            res.json({
                title: "Server error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        default:
            console.log("No error");
    }
};

module.exports = errorHandler;
