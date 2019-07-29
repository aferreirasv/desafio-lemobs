'use strict';

// Imports
const dotenv = require('dotenv').config({path: '.env'});
const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();
const cors = require('cors');
const controllers = require('./api/controllers')
const bodyParser = require('body-parser')
const db = require('./db')

// Configurações Swagger

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(controllers)


const config = {
    appRoot: __dirname // required config
};

app.use(express.static('public'));

SwaggerExpress.create(config, (err, swaggerExpress) => {
    if (err) {
        console.log(JSON.stringify(err, null, 2))
        throw err;
    }

    // Registrar Middleware
    swaggerExpress.register(app);
    
    // Iniciar o servidor
    app.listen(process.env.PORT, () => {
        console.log(`API configurada corretamente e escutando na porta ${process.env.PORT}`);
    });
});

module.exports = app;
