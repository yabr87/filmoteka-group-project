import axios from 'axios';
import genresJson from './components/genres.json';
export class MovieService {
  #BASE_URL;
  #API_KEY;
  #TREND_URL;
  #SEARCH_URL;
  #ID_MOVIE_URL;
  #GET_BY_GENRE;
  #POSTER_PATH;
  #genresMap;
  constructor() {
    this.#API_KEY = '1db949d546d8184041e5d93169d90d9f';
    this.#BASE_URL = 'https://api.themoviedb.org/3';
    this.#TREND_URL = `${this.#BASE_URL}/trending/movie/week`;
    this.#SEARCH_URL = `${this.#BASE_URL}/search/movie`;
    this.#ID_MOVIE_URL = `${this.#BASE_URL}/movie/`;
    this.#GET_BY_GENRE = `${this.#BASE_URL}/genre/movie/list`;
    this.#POSTER_PATH = `https://image.tmdb.org/t/p/original`;
    this.#genresMap = this.readGenresFromJson();
    this.page = 1;
  }
  async getTrending() {
    try {
      const { data } = await axios.get(
        `${this.#TREND_URL}?api_key=${this.#API_KEY}&page=${this.page}`
      );
      return data;
    } catch (error) {
      console.error('Smth wrong with api get full trends' + error);
    }
  }
  async search(text, page) {
    try {
      const { data } = await axios.get(
        `${this.#SEARCH_URL}?api_key=${
          this.#API_KEY
        }&query=${text}&page=${page}`
      );
      return data;
    } catch (error) {
      console.error('Smth wrong with api get full trends' + error);
    }
  }
  async getMovieDetails(movieId) {
    try {
      const { data } = await axios.get(
        `${this.#ID_MOVIE_URL}${movieId}?api_key=${
          this.#API_KEY
        }&append_to_response=videos`
      );
      return data;
    } catch (error) {
      console.error('Smth wrong with api get full trends' + error);
    }
    let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
      this.#API_KEY
    }`;
    return axios.get(url);
  }
  async getByGenre(genre) {
    try {
      const { data } = await axios.get(
        `${this.#GET_BY_GENRE}?api_key=${this.#API_KEY}`
      );
      return data;
    } catch (error) {
      console.error('Smth wrong with api get full trends' + error);
    }
  }
  getPosterPath(imagePath) {
    return this.#POSTER_PATH + imagePath;
  }
  9;
  getGenresByIds(ids) {
    const genres = [];
    ids.forEach(id => {
      genres.push(this.#genresMap.get(id));
    });
    return genres;
  }
  readGenresFromJson() {
    const genresMap = new Map();
    genresJson.genres.map(entry => {
      genresMap.set(entry.id, entry.name);
    });
    return genresMap;
  }
  fetchByMultipleIds(arr) {
    return arr.map(id => {
      return axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
          this.#API_KEY
        }&append_to_response=videos`
      );
    });
  }
}
