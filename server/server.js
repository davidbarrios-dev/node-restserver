require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

// Configuración global de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;

    console.log("Base de datos Online!");
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto: ', process.env.PORT);
});