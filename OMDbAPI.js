class OMDbAPI {
    constructor() {
        this._apiKey = '5795a055';
        this._type = 'movie';
        this._page = 1;
    }

    async getMoviesID(moveName) {
        const response = await fetch(`http://www.omdbapi.com/?s=${moveName}&type=${this._type}&page=${this._page}&apikey=${this._apiKey}`);
        const data = await response.json();
        return data.Search.map( movieID => movieID.imdbID );
    }

    async getMovies(imdb) {
        const response = await fetch(`http://www.omdbapi.com/?i=${imdb}&apikey=${this._apiKey}`);
        const data = await response.json();
        return data;
    }
    
}

export default OMDbAPI;