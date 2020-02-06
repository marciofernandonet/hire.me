const mongoose = require('mongoose');

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => { 
    console.log('Banco de dados conectado');
}).catch(err => {
    console.error(`Error: ${err}`);
    throw err;
});