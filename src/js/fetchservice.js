import axios from 'axios';

export class MovieService {

    #API_KEY;

    constructor() {
        this.#API_KEY = '1db949d546d8184041e5d93169d90d9f';
    }

    getTrending(params = {}) {
        let url = `https://api.themoviedb.org/3/trending`;
        url = `${url}/${params.mediaType}/${params.timeWindow}?api_key=${this.#API_KEY}&page=${params.page}`;
        console.log(url);
        return axios.get(url);
    };

    search(searhTerm) {
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${this.#API_KEY}`;
        url = url + `&query=${searhTerm.query}` + `&page=${searhTerm.page}`
            + `&include_adult=${searhTerm.include_adult}` + `&region=${searhTerm.region}`
            + `&year=${searhTerm.year}` + `&year=${searhTerm.year}` + `&release_year=${searhTerm.primary_release_year}`
            + `&language=${searhTerm.language}`;
        console.log(url);
        return axios.get(url);
    };

    getMovieDetailі(movieId) {
        let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.#API_KEY}&append_to_response=videos`;
        console.log(url);
        return axios.get(url);
    };

    getByGenre(genre) {
        let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.#API_KEY}`;
        console.log(url);
       
        return axios.get(url);

    };
}