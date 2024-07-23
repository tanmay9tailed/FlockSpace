const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies if needed
  }));
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Server listening")
})
app.use("/uploads", express.static("uploads"));
app.use("/api", postRoutes);
app.use("/api", userRoutes);

module.exports = app;
