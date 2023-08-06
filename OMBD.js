export default class OMDB {
  async get(url) {
    const res = await fetch(url);
    const data = res.json();
    return data;
  }

  getMovies(movieArr) {
    let moviesHtml = "";
    movieArr.forEach((movie) => {
      console.log(movie);
      moviesHtml += `
      <div id="movieContainer">
        <img class="posterImg" src=${this.getPoster(movie)} />
        <div id="movie">
          <div id="movieHeader">
            <h2>${movie.Title}</h2>
            <div id="imdb">
              <img
                src="assets/img/star.png"
                id="imdbStar"
                alt="rating-star"
              />
              <p id="imdbRating">${this.getimdbRating(movie)}</p>
            </div>
          </div>
          <div id="movieInformation">
            <div id="movieRuntime">${this.getRuntime(movie)}</div>
            <div id="movieGenre">${this.getGenre(movie)}</div>
            <div data-imdbID="${movie.imdbID}" id="movieWatchlist">
              <img src="assets/img/watchlist.svg" alt="watchlist-add-icon" id="movieWatchlistIcon" />
              <p id="movieWatchlistText">Watchlist</p>
            </div>
          </div>
          <div id="movieDescription">
            <p id="movieDescriptionText">${this.getPlot(movie)}</p>
          </div>
        </div>
      </div>
      <hr />
      `;
    });
    return moviesHtml;
  }

  getPoster(movie) {
    return movie.Poster === "N/A"
      ? "./assets/img/no-poster2.png"
      : movie.Poster;
  }

  getRuntime(movie) {
    return movie.Runtime === "N/A" ? "? min" : movie.Runtime;
  }

  getPlot(movie) {
    return movie.Plot === "N/A" ? "No information available." : movie.Plot;
  }

  getGenre(movie) {
    return movie.Genre === "N/A" ? "No genre" : movie.Genre;
  }

  getimdbRating(movie) {
    return movie.imdbRating === "N/A" ? "?" : movie.imdbRating;
  }
}
