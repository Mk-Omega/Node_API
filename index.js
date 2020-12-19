require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

//Init app
const app = express();

//server port
const port = process.env.PORT || 5000

//to request data. Content-Type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

//to request data. Content-Type application/json
app.use(bodyParser.json());

//this is the root route
app.get('/', (req, res) => {
    res.json({message: 'Server up and running'})
})

//import user routes
const userRoutes = require('./src/routes/user.route')

//create user middleware
app.use('/api/v1/users/', userRoutes);


//start server
app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`)
})