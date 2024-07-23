const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Server listening")
})
app.use("/uploads", express.static("uploads"));
app.use("/api", postRoutes);
app.use("/api", userRoutes);

module.exports = app;
