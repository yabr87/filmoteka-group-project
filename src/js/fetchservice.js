import axios from 'axios';

const API_KEY = 'a92a89ae507ae16c2ec6dfd84780d28c';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.filmsPage = 1;
  }

  async fetchGenre() {
    const genres = await axios.get(
      `${BASE_URL}genre/movie/list?api_key=${API_KEY}`
    );
    // console.log(genres.data.genres);
    return genres.data.genres;
  }

  async fetchTrendingFilms() {
    const trand = await axios.get(
      `${BASE_URL}trending/movie/week?api_key=${API_KEY}&page=${this.filmsPage}`
    );
    // console.log(trand.data);
    return await trand.data.results;
  }

  async fetchFilmsByName() {
    const name = await axios.get(
      `${BASE_URL}search/movie?api_key=${API_KEY}&query=${this.searchQuery}`
    );
    console.log(name.data.results);
    return name.data.results;
  }

  async fetchFilmsById(id) {
    const film = await axios.get(
      `${BASE_URL}movie/${id}?api_key=${API_KEY}&append_to_response=videos`
    );
    console.log(film.data);
    return film.data;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get page() {
    return this.filmsPage;
  }

  set page(newPage) {
    this.filmsPage = newPage;
  }
}
