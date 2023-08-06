import { searchMovie, addWatchlist, getMovies, getPromises } from "./utils.js";

const searchForm = document.getElementById("searchForm");
const searchName = document.getElementById("searchName");

window.addEventListener("click", (e) => {
  if (e.target.id === "movieWatchlist") {
    addWatchlist(e.target.dataset.imdbid);
  } else if (
    e.target.id === "movieWatchlistIcon" ||
    e.target.id === "movieWatchlistText"
  ) {
    addWatchlist(e.target.parentElement.dataset.imdbid);
  }
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  searchMovie(searchName.value);
});

if (document.title === "Watchlist") {
  const watchlistMovies = JSON.parse(localStorage.getItem("watchlistMovies"));
  const movies = getMovies(watchlistMovies);
  getPromises(movies);
  document.querySelector("#moviesWatchlist").innerHTML = "<p>addasdds</p>";
}
