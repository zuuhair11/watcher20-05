class LStorage {
    constructor() {
        this._watchlistArray;
    }

    setMovieToLocalStorage(watchlistMovie) {
        localStorage.setItem('watchlist', JSON.stringify(watchlistMovie));
    }

    getMoviesFromLocalStorage() {
        if(localStorage.getItem('watchlist') !== null) {
            return localStorage.getItem('watchlist');
        } else {
            return this._watchlistArray = JSON.stringify([]);
        }
    }
}

export default LStorage;