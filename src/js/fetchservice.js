import axios from 'axios';

export class MovieService {

    #API_KEY;

    constructor() {
        this.#API_KEY = '1db949d546d8184041e5d93169d90d9f';
    }

    getTrending(params = {}) {
        let url = `https://api.themoviedb.org/3/trending`;
        if ('mediaType' in params) { 
            url = url + `/${params.mediaType}`; 
        }
        if ('timeWindow' in params) { 
            url = url + `/${params.timeWindow}`; 
        }
        url = `${url}?api_key=${this.#API_KEY}`;
        console.log(url);
        return axios.get(url);
    };

    search(searhTerm) {
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${this.#API_KEY}`;
        if ('query' in searhTerm) { 
            url = url + `&query=${searhTerm.query}`; 
        }
        if ('page' in searhTerm) { 
            url = url + `&page=${searhTerm.page}`; 
        }
        if ('include_adult' in searhTerm) { 
            url = url + `&include_adult=${searhTerm.include_adult}`; 
        }
        if ('region' in searhTerm) { 
            url = url + `&region=${searhTerm.region}`; 
        }
        if ('year' in searhTerm) { 
            url = url + `&year=${searhTerm.year}`; 
        }
        if ('primary_release_year' in searhTerm) { 
            url = url + `&release_year=${searhTerm.primary_release_year}`; 
        }
        if ('language' in searhTerm) { 
            url = url + `&language=${searhTerm.language}`; 
        }
        
        console.log(url);
        return axios.get(url);
    };

    getMovieDetails(movieId) {
        let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.#API_KEY}`;
        return axios.get(url);
    };

    getMovieVideos(movieId) {
        let url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${this.#API_KEY}`;
        console.log(url);
        return axios.get(url);
    };

}

