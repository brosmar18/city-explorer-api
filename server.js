/* eslint-disable no-undef */
'use strict';
console.log('!!server.js connected.');

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 5005;

const getWeatherInfo = require('./modules/weather.js');
const getMovieInfo = require('./modules/movies');
const getYelpInfo = require('./modules/yelp.js');

const app = express();
app.use(cors());

app.get('/', (request, response) => {
  response.send('Hello from our server file!!');
});

app.get('/weather', (request, response) => {
  const { lat, lon } = request.query;
  getWeatherInfo(lat, lon)
    .then(summaries => response.status(200).send(summaries))
    .catch(error => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!' + error.message);
    });
});


app.get('/movies', (request, response) => {
  const location = request.query.searchQuery;
  getMovieInfo(location)
    .then(movieList => response.status(200).send(movieList))
    .catch(error => {
      console.error(error);
      response.status(500).send('Oops! Something went wrong.' + error.message);
    });
});

app.get('/yelp', (request, response) => {
  const location = request.query.searchQuery;
  getYelpInfo(location, request.query.page)
    .then(reviews => response.send(reviews))
    .catch(error => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!');
    });
});

// class Forecast {
//   constructor(weatherObjects) {
//     this.date = weatherObjects.valid_date;
//     this.description = weatherObjects.weather.description;
//   }
// }

app.get('*', (request, response) => {
  response.send('The route was not found. Error 404');
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
