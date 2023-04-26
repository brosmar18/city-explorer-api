'use strict';
console.log('!!server.js connected.');

//1. npm i express
const express = require('express');
//how wee bring the env file.
require('dotenv').config();
let weatherData = require('./data/weather.json');

//Now include cors to share resources over the web.
const cors = require('cors');

//2.
const app = express();
app.use(cors());

// npm i dotenv = define our port, validat that my .env file is working.
//if server runs on 3002, I know something is wrong with my env file.
const PORT = process.env.PORT || 5005;

app.get('/', (request, response) => {
    //then we need to send something back.
    response.send('hello from our server!!');
});


// Listen for port to start the serveer.
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
//.listen() is an express method that takes in a PORT value and a callback function.
