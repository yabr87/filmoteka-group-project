import axios from "axios";

export class MovieService {
    #BASE_URL;
    #API_KEY;
    #TREND_URL;
    #SEARCH_URL;
    #ID_MOVIE_URL;
    #GET_BY_GENRE;
    #POSTER_PATH;


    constructor() {
        this.#API_KEY = '1db949d546d8184041e5d93169d90d9f';
        this.#BASE_URL = 'https://api.themoviedb.org/3';
        this.#TREND_URL = `${this.#BASE_URL}/trending/movie/week`;
        this.#SEARCH_URL = `${this.#BASE_URL}/search/movie`;
        this.#ID_MOVIE_URL = `${this.#BASE_URL}/movie/`;
        this.#GET_BY_GENRE = `${this.#BASE_URL}/genre/movie/list`;
        this.#POSTER_PATH = `https://image.tmdb.org/t/p/original`;
    }

    async getTrending(page) {
        try {
            const { data } = await axios.get(
                `${this.#TREND_URL}?api_key=${this.#API_KEY}&page=${page}`,
                console.log(`${this.#TREND_URL}?api_key=${this.#API_KEY}&page=${page}`)
            );
            console.log(data);
            return data;
        } catch (error) {
            console.error('Smth wrong with api get full trends' + error);
        }
    }

    async search(text, page) {
        try {
            const { data } = await axios.get(
                `${this.#SEARCH_URL}?api_key=${this.#API_KEY}&query=${text}&page=${page}`,
                console.log(`${this.#SEARCH_URL}?api_key=${this.#API_KEY}&query=${text}&page=${page}`)
            );
            console.log(data);
            return data;
        } catch (error) {
            console.error('Smth wrong with api get full trends' + error);
        }
    };

    async getMovieDetails(movieId) {
        try {
            const { data } = await axios.get(
                `${this.#ID_MOVIE_URL}${movieId}?api_key=${this.#API_KEY}&append_to_response=videos`,
                console.log(`${this.#ID_MOVIE_URL}${movieId}?api_key=${this.#API_KEY}&append_to_response=videos`)
            );
            console.log(data);
            return data;
        } catch (error) {
            console.error('Smth wrong with api get full trends' + error);
        }
        let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.#API_KEY}`;
        return axios.get(url);
    };

    async getByGenre(genre) {
        try {
            const { data } = await axios.get(
                `${this.#GET_BY_GENRE}?api_key=${this.#API_KEY}&append_to_response=videos`,
                console.log(`${this.#GET_BY_GENRE}?api_key=${this.#API_KEY}&append_to_response=videos`)
            );
            console.log(data);
            return data;
        } catch (error) {
            console.error('Smth wrong with api get full trends' + error);
        }
    }

    getPosterPath(imagePath) {
        return this.#POSTER_PATH + imagePath;
    }
}