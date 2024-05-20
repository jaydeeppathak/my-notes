const express = require("express");
const dotenv = require("dotenv").config();
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDb = require("./config/dbConnection");
// const errorHandler = require("./middleware/errorHandler");
const responseFormatter = require("./middleware/responseFormatter");
const serverless = require("serverless-http");

connectDb();
const app = express();
const port = process.env.PORT || 5000;
const router = express.Router();

app.use(express.json());
app.use(responseFormatter);
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);
// app.use(errorHandler);

// app.listen(port, () => {
//     console.log(`Listeing on port ${port}`);
// });

app.use("/.netlify/functions/api", router);
export const handler = serverless(app);
