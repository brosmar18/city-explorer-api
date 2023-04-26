'use strict';
console.log('!!server.js connected.');

// REQUIRE
// In our server, we have to use 'require' instead of import'
// Here we will list the requirement for a server.

//1. npm i express
const express = require('express');
//how wee bring the env file.
require('dotenv').config();
const cors = require('cors');

// Two things to get a server running
// npm i dotenv - define our port, validate that my .env file is working.
// if server runs on 5005, I know something is wrong with my env file.
// Set up a PORT to handle functionality.
const PORT = process.env.PORT || 5005;


// Add data
let data = require('./data/weather.json');

// Use
//Express takes 2 steps: 'require' and 'use'.
const app = express();
app.use(cors());


app.get('/', (request, response) => {
  response.send('Hello from our server file!!');
});

app.get('/weather', (request, response) => {
  //http://localhost:3002/weather?lat=47.60621&lon=-122.33207&searchQuery=Seattle
  console.log('req object', request.query.searchQuery);
  let lat = request.query.lat;
  let lon = request.query.lon;
  console.log(lat, lon);

  response.send(`Lattitute: ${lat} Longtitute: ${lon}`);
});

// Add route to handle the front end request.




// Add class to process the data before we send it back to the front.
// Class and Constructor.




//handles all route requests when we don't have that route.
app.get('*', (request, response) => {
  response.send('The route was not found. Error 404');
});



// Listen for port to start the serveer.
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
//.listen() is an express method that takes in a PORT value and a callback function.
