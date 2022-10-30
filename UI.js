class UI {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.main = document.querySelector('main');
        this.results = document.querySelector('.first-placeholder');
        this.secondFromAPI = document.querySelector('.second-from-api');
    }

    // Output each movies
    renderMovies(movie) {
        this.secondFromAPI.innerHTML += `
            <div class="output-container">

                <img class="poster-movie" src="${movie.Poster}">

                <div class="about-movie">
                    <div class="title">
                        <h4>${movie.Title}</h4>
                        <i class="fa-solid fa-star"></i><span>${movie.imdbRating}</span>
                    </div>

                    <div class="details">
                        <span class="runtime">${movie.Runtime}</span>
                        <span class="genre">${movie.Genre}</span>
                        <span class="watchlist"><i class="fa-solid fa-circle-plus"></i> Watchlist</span>
                    </div>

                    <div class="plot">
                        <p>${movie.Plot}</p>
                    </div>
                </div>
            </div>
            <hr>
        `;
    }

    clearUP() {
        // Clear the search input
        this.searchInput.value = '';
        // Hide the placeholder when the results comes in
        this.results.classList = 'first-placeholder hide-placeholder'
        // Clear the main if there's any output movies
        this.results.innerHTML = '';
        this.secondFromAPI.innerHTML = '';
    }

    // If there was an error
    renderErr(message) {
        this.secondFromAPI.innerHTML = '';
        this.results.classList.remove('hide-placeholder')
        this.results.innerHTML = `
            <p>${message}</p>
        `;
    }
}
export {UI};