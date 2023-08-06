import { searchMovie } from "./utils.js";

const searchForm = document.getElementById("searchForm");
const searchName = document.getElementById("searchName");

window.addEventListener("click", (e) => {
  if (e.target.id === "movieWatchlist") {
    console.log(e.target.dataset.imdbid);
  } else if (
    e.target.id === "movieWatchlistIcon" ||
    e.target.id === "movieWatchlistText"
  ) {
    console.log(e.target.parentElement.dataset.imdbid);
  }
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  searchMovie(searchName.value);
});
