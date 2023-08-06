import { api } from "./data.js";
import OMDB from "./OMBD.js";

const omdb = new OMDB();

let fetches = [];
const watchlistMovies = [];

const getPromises = (movieArr) => {
  Promise.all(fetches).then(function () {
    const movies = omdb.getMovies(movieArr);

    if (document.title === "Watchlist") {
      document.getElementById("moviesWatchlist").innerHTML = movies;
    } else if (document.title === "Movie Watchlist") {
      document.getElementById("movies").innerHTML = movies;
    }

    fetches = [];
  });
};

const getMovies = (dataArr) => {
  const movieArr = [];
  dataArr.forEach((movie) => {
    // Adding the promises we're getting from fetch to an array so that
    // after all promises are in the array we can loop through them
    // together
    const objOrString = typeof movie === "object" ? movie.imdbID : movie;
    fetches.push(
      omdb
        .get(`${api.dataRequestUrl}${api.key}&i=${objOrString}`)
        .then((data) => {
          movieArr.push(data);
          return movieArr;
        })
    );
  });
  return movieArr;
};

const searchMovie = (title) => {
  omdb
    .get(`${api.dataRequestUrl}${api.key}&s=${title}`)
    .then((data) => {
      // adding the movies we searched to an array because the movies fetched with
      // s parameter has very little information. So that we can loop through the
      // array and fetch the proper information with i paramater that we're using
      // on the next .then
      const dataArr = [];
      data.Search.forEach((movie) => {
        dataArr.push(movie);
      });
      return dataArr;
    })
    .then((dataArr) => {
      const moviesArr = getMovies(dataArr);
      return moviesArr;
    })
    .then((movieArr) => {
      getPromises(movieArr);
    });
};

const addWatchlist = (imdbID) => {
  watchlistMovies.push(imdbID);
  const unique = Array.from(new Set(watchlistMovies));
  localStorage.setItem("watchlistMovies", JSON.stringify(unique));
  console.log(JSON.parse(localStorage.getItem("watchlistMovies")));
};

export { searchMovie, addWatchlist, getMovies, getPromises };
