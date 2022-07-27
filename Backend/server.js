require('dotenv').config()
const express = require('express')
const bodyP = require('body-parser')
const app = express()
const Routes = require('./Routes')
const swagger =  require('swagger-ui-express')
const swaggerJson = require('./swagger_output.json')
const cors = require("cors");
require('./DB/start.js');

app.use(bodyP.json())
app.use(bodyP.urlencoded({ extended:true }));
app.use(cors())
app.use('/api-docs', swagger.serve, swagger.setup(swaggerJson));
app.use('/',Routes)

module.exports = app