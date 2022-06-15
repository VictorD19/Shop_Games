require('dotenv').config()
const express = require('express')
const bodyP = require('body-parser')
const app = express()
const Routes = require('./Routes')
require('./DB/start.js');
const port = 3001

app.use('/',Routes)
app.use(bodyP.urlencoded({ extended:true }));
app.use(bodyP.json())
app.listen(port, () => console.log(`🚀 Api Iniciada na porta:  ${port}!`))