require('dotenv').config()
const express = require('express')
const bodyP = require('body-parser')
const app = express()
const Routes = require('./Routes')
require('./DB/start.js');
const port = 3001

app.use(bodyP.json())
app.use(bodyP.urlencoded({ extended:true }));
app.use('/',Routes)
app.listen(port, () => console.log(`🚀 Api Iniciada na porta:  ${port}!`))