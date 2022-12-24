import axios from 'axios';
import genresJson from './components/genres.json';

const API_KEY = '1db949d546d8184041e5d93169d90d9f';
const BASE_URL = 'https://api.themoviedb.org/3';
const POSTER_PATH = `https://image.tmdb.org/t/p/original`;

export class MovieService {
  #genresMap;
  constructor() {
    this.#genresMap = this.readGenresFromJson();
    this.page = 1;
    this.searchQuery = '';
  }

  async getTrending() {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${this.page}`
      );
      return data;
    } catch (error) {
      console.error('Smth wrong with api get full trends' + error);
    }
  }

  async search() {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${this.searchQuery}&page=${this.page}`
      );
      return data;
    } catch (error) {
      console.error('Smth wrong with api get full trends' + error);
    }
  }

  async getMovieDetails(movieId) {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`
      );
      return data;
    } catch (error) {
      console.error('Smth wrong with api get full trends' + error);
    }
    let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
    return axios.get(url);
  }

  async getByGenre() {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
      );
      return data;
    } catch (error) {
      console.error('Smth wrong with api get full trends' + error);
    }
  }

  getPosterPath(imagePath) {
    return POSTER_PATH + imagePath;
  }

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
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
      );
    });
  }
}
