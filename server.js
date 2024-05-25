const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDb = require("./config/dbConnection");
// const errorHandler = require("./middleware/errorHandler");
const responseFormatter = require("./middleware/responseFormatter");

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(responseFormatter);

app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);
// app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listeing on port ${port}`);
});
