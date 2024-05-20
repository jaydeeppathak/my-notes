const express = require("express");
const dotenv = require("dotenv").config();
const noteRoutes = require("./routes/noteRoutes");
const connectDb = require("./config/dbConnection");
// const errorHandler = require("./middleware/errorHandler");
const responseFormatter = require("./middleware/responseFormatter");

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(responseFormatter);
app.use("/api/notes", noteRoutes);
// app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listeing on port ${port}`);
});
