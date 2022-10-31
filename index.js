// Importing
import OMDbAPI from "./OMDbAPI.js";
import {UI} from "./UI.js";
import LStorage from "./LS.js";

// Instantiate
const http = new OMDbAPI();
const ui = new UI();
const storage = new LStorage();

// Getting the element from the DOM
const searchInput = document.getElementById('search-input');

// Watchlist array that stored on localStorage
const watchlistArray = JSON.parse(storage.getMoviesFromLocalStorage());



document.body.addEventListener('click', (e) => {
    // Listen for the saved to the watchlist
    if(e.target.classList.contains('watchlist')) {
        const movie = e.target.dataset.movie;
        watchlistArray.push(movie);
        storage.setMovieToLocalStorage(watchlistArray)
    }
    // Listen for the click on the search button
    if(e.target.classList.contains('search-btn')) {
        const movieName = searchInput.value;
        // Check if user doesn't entred anything 
        if(movieName.length !== 0) {
            // Getting the ID for all movies
            http.getMoviesID(movieName)
                // If everything went well keep up the process
                .then(movieImdbs => {
                    // Clear the search field & icon and if there's other movie showed..
                    ui.clearUP();
                    // Loop through movies by id
                    movieImdbs.map( imdb => {
                        http.getMovies(imdb)
                            .then(movie => {
                                // Renderd each movies into the DOM
                                ui.renderMovies(movie);
                            })
                    })
                })
    
                // Dispaly to the user that movie doesn't exists
                .catch(() => {
                    // placeholder.classList.remove('hide-placeholder');
                    ui.renderErr('Unable to find what you’re looking <br> for. Please try another search.')
                })
    
        } else {
            alert('Please enter something');
        }
    }
})