const winston = require("winston");

const logger = winston.createLogger({
    level: "error",
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});
const responseFormatter = (req, res, next) => {
    res.sendSuccess = (data, message = "Success") => {
        logger.info(message);
        res.status(200).json({
            success: true,
            data,
            message,
        });
    };

    res.sendError = (error, statusCode = 500) => {
        logger.error(message);
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
