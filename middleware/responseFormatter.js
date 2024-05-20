const responseFormatter = (req, res, next) => {
    res.sendSuccess = (data, message = "Success") => {
        res.status(200).json({
            success: true,
            data,
            message,
        });
    };

    res.sendError = (error, statusCode = 500) => {
        res.status(statusCode).json({
            success: false,
            message: error.message || "Something went wrong",
            details: error.details || null,
        });
        return;
    };

    next();
};

module.exports = responseFormatter;
