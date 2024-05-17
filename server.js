const express = require("express");
const dotenv = require("dotenv").config();
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/notes", noteRoutes);

app.listen(port, () => {
    console.log(`Listeing on port ${port}`);
});
