// Importing
import OMDbAPI from "./OMDbAPI.js";
import {UI} from "./UI.js";

// Instantiate
const http = new OMDbAPI();
const ui = new UI();

// Getting the element from the DOM
const searchInput = document.getElementById('search-input');



// Listen for the click on the search button
document.body.addEventListener('click', (e) => {
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