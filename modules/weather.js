'use strict';
const axios = require('axios');
require('dotenv').config();

let cache = require('./cache.js');

async function getWeatherInfo(latitude, longitude) {
    const key = 'weather-' + latitude + longitude;
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&days=5&aqi=no&alerts=no&q=${latitude},${longitude}`;

    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {

    } else {
        cache[key] = {};
        cache[key].timestamp = Date.now();
        cache[key].data = await axios.get(url)
            .then(response => parseWeatherData(response.data));
    }
    return cache[key].data;
}

function parseWeatherData(weatherData) {
    try {
        const weatherSummaries = weatherData.forecast.forecastday.map(day => {
            return new WeatherSummary(day);
        });
        return Promise.resolve(weatherSummaries);
    } catch (e) {
        return Promise.reject(e);
    }
}

class WeatherSummary {
    constructor(day) {
        for (let i = 0; i < day.hour.length; i++) {
            this.forecast = day.hour[i].condition.text;
        }
        this.time = day.date;
    }
}

module.exports = getWeatherInfo;
