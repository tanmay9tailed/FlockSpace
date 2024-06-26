const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes')

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(cors({
  origin: 'https://flock-space.vercel.app/'
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', postRoutes);
app.use('/api', userRoutes);

module.exports = app;
