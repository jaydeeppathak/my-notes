const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp}  ${level}: ${message}`;
});

const logger = createLogger({
    level: "info",
    format: combine(timestamp(), myFormat),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "app.log" }),
    ],
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
        logger.error(error.message);
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
