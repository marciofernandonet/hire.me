require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const PORT = process.env.SERVER_PORT || 3001;

app = express();

require('./config/database');

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});