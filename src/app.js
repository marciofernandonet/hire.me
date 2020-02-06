require('dotenv').config();

const express = require('express');
const cors = require('cors');
const shortenRoutes = require('./routes/shorten');

app = express();

require('./config/connect_db');

app.use(cors());
app.use(express.json());
app.use('/', shortenRoutes);

module.exports = app;