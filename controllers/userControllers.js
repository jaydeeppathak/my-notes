const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc Register user
// @route POST /api/user/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const error = new Error("All fields are mandatory");
        res.sendError(error, 400);
        return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        const error = new Error("User already exists");
        res.sendError(error, 400);
        return;
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.sendSuccess(user, "User created successfully");
    } else {
        const error = new Error("User data is not valid");
        res.sendError(error, 500);
        return;
    }
});

// @desc Login user
// @route POST /api/user/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        const error = new Error("All fields are mandatory");
        res.sendError(error, 400);
        return;
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "24h",
            },
        );
        res.sendSuccess(accessToken, "Login user");
    } else {
        const error = new Error("Email or password is not valid");
        res.sendError(error, 401);
        return;
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.sendSuccess(req.user, "Current user");
});

module.exports = { registerUser, loginUser, currentUser };
