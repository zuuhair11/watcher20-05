// Importing 
import OMDbAPI from "./OMDbAPI.js";
import LStorage from "./LS.js";
import {UI} from "./UI.js";

// Instantiate from localStroge
const storage = new LStorage();
const http = new OMDbAPI();
const ui = new UI();


// Grap all movies that are saved on localStorge
const wachtlistArray = JSON.parse(storage.getMoviesFromLocalStorage());

// When the DOM Loadd I want to render all movies in my watchlist if there's any
addEventListener('DOMContentLoaded', renderWatchlist);

function renderWatchlist() {
    if(wachtlistArray.length !== 0) {
        document.querySelector('.first-placeholder').style.display = 'none';
        // Clear the search field & icon and if there's other movie showed..
        wachtlistArray.map( imdb => {
        http.getMovies(imdb)
            .then( movie => {
                // Renderd each movies into the DOM
                ui.renderWatchlistMovies(movie); 
            })
        })

    }
}

// Listen for remove click on my watchlist movie
document.body.addEventListener('click', (e) => {
    const removeIcon = e.target;
    if(removeIcon.classList.contains('remove')) {
        // Getting the movie id you wanna delete from watchlist
        const movie = e.target.dataset.movie;
        // Getting the index of it inside my array watchlist
        const index = wachtlistArray.indexOf(movie);
        // Remove it
        wachtlistArray.splice(index, 1);
        // Update my watchlist array that is stored on my localSorage
        storage.setMovieToLocalStorage(wachtlistArray);
        // Update the DOM as well
        // Remove the border first
        removeIcon.parentElement.parentElement.parentElement.nextElementSibling.remove();
        // And then remove the movie element
        removeIcon.parentElement.parentElement.parentElement.remove();

        // If the watchlist array empty then dispay if you want to add a new movie to it, basically go back to search movie
        if(wachtlistArray.length === 0) {
            document.querySelector('.first-placeholder').style.display = 'flex';
        }
    }
});
