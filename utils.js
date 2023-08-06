import { api } from "./data.js";
import OMDB from "./OMBD.js";

const omdb = new OMDB();

let fetches = [];

const searchMovie = (title) => {
  omdb
    .get(`${api.dataRequestUrl}${api.key}&s=${title}`)
    .then((data) => {
      const dataArr = [];
      data.Search.forEach((movie) => {
        dataArr.push(movie);
      });
      return dataArr;
    })
    .then((dataArr) => {
      const movieArr = [];
      dataArr.forEach((movie) => {
        fetches.push(
          omdb
            .get(`${api.dataRequestUrl}${api.key}&i=${movie.imdbID}`)
            .then((data) => {
              movieArr.push(data);
              return movieArr;
            })
        );
      });
      return movieArr;
    })
    .then((movieArr) => {
      Promise.all(fetches).then(function () {
        const movies = omdb.getMovies(movieArr);

        document.getElementById("movies").innerHTML = movies;

        fetches = [];
      });
    });
};

export { searchMovie };
