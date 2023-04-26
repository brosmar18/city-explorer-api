/* eslint-disable no-undef */
'use strict';
console.log('!!server.js connected.');


const express = require('express');
require('dotenv').config();
const cors = require('cors');


const PORT = process.env.PORT || 5005;

let data = require('./data/weather.json');


const app = express();
app.use(cors());


app.get('/', (request, response) => {
  response.send('Hello from our server file!!');
});

app.get('/weather', (request, response, next) => {
  //http://localhost:3002/weather?lat=47.60621&lon=-122.33207&searchQuery=Seattle
  try {
    let searchQuery = request.query.searchQuery;
    console.log(searchQuery);
    // we need to find city
    let dataToConstructor = data.find(weather => weather.city_name.toLowerCase() === searchQuery.toLowerCase());
    console.log('HHHH', dataToConstructor);
    // we need map over our city objects in the data
    let dataSending = dataToConstructor.data.map(dayForecast => new Forecast(dayForecast));
    console.log('back from constructor', dataSending);
    response.send(dataSending);
    // response.send('Lattitute: ${lat} Longtitute: ${lon}');
  } catch (error) {
    next(error);
  }
});

class Forecast {
  constructor(weatherObjects) {
    console.log('SSS', weatherObjects.valid_date, weatherObjects.weather.description);
    this.date = weatherObjects.valid_date;
    this.description = weatherObjects.weather.description;
  }
}


app.get('*', (request, response) => {
  response.send('The route was not found. Error 404');
});



app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
