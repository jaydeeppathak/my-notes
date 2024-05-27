const express = require("express");
const serverless = require("serverless-http");
const noteRoutes = require("../routes/noteRoutes");
const userRoutes = require("../routes/userRoutes");
const connectDb = require("../config/dbConnection");
const responseFormatter = require("../middleware/responseFormatter");
require("dotenv").config();

connectDb();
const app = express();

const corsOptions = {
    credentials: true,
    origin: "https://rough-note.netlify.app",
};

app.use(express.json());
app.use(responseFormatter);

app.use(cors(corsOptions));
app.get("/api/hello", (req, res) => {
    res.json({ message: "hello" });
});

app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

const handler = serverless(app);

// module.exports = serverless(app);
module.exports.handler = async (event, context) => {
    const result = await handler(event, context);
    return result;
};
