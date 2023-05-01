// https://api.themoviedb.org/3/movie/550?api_key=4afc86b14e9d0f4aa2af7704c0c70211
'use strict';
const axios = require('axios');
require('dotenv').config();

let cache = require('./cache.js');

async function getMovieInfo(location) {
    const key = 'movies-' + location;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${location}`;

    if (!cache[key]) {
        cache[key] = {};
        cache[key].timestamp = Date.now();
        cache[key].data = axios.get(url).then((data) => parseMovieData(data.data));
    }
    return cache[key].data;
}

function parseMovieData(movieData) {
    try {
        const movieSummaries = movieData.results.map((movie) => {
            return new MovieSummary(movie);
        });
        return Promise.resolve(movieSummaries);
    } catch (e) {
        return Promise.reject(e);
    }
}

class MovieSummary {
    constructor(movie) {
        this.tableName = 'movies';
        this.title = movie.title;
        this.overview = movie.overview;
        this.averageVotes = movie.vote_average;
        this.totalVotes = movie.vote_count;
        this.imageUrl = movie.poster_path;
        this.popularity = movie.popularity;
        this.releasedOn = movie.release_date;
        this.timestamp = Date.now();
    }
}

module.exports = getMovieInfo;
