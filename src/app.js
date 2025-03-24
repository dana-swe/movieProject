const express = require('express');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/v1/', authRoutes);
app.use('/api/v1/movies', movieRoutes);

module.exports = app;
