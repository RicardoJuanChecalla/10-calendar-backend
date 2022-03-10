const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {dbConnection} = require('./database/config');

//crear servidor express
const app = express();

//cors
app.use(cors());

//Base de datos
dbConnection();

//Directorio publico
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json());

//Rutas 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/event', require('./routes/event'));

//Escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
});