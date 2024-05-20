const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;

    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if (!token) {
            const error = new Error("Token not provided");
            res.sendError(error, 401);
            return;
        }

        // verify token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                const error = new Error("User is not authorized");
                res.sendError(error, 403);
                return;
            }

            req.user = decoded.user;
            next();
        });
    } else {
        const error = new Error("Token not provided");
        res.sendError(error, 401);
        return;
    }
});

module.exports = validateToken;
