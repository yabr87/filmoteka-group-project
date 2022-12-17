import axios from 'axios';

const API_KEY = 'a92a89ae507ae16c2ec6dfd84780d28c';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.filmsPage = 1;
  }

  async fetchGenre() {
    const genre = await axios.get(
      `${BASE_URL}genre/movie/list?api_key=${API_KEY}`
    );
    // console.log(genre.data.genres);
    return genre.data.genres;
  }

  async fetchTrendingFilms() {
    const trand = await axios.get(
      `${BASE_URL}trending/movie/week?api_key=${API_KEY}&page=${this.filmsPage}`
    );
    // console.log(trand.data);
    return await trand.data.results;
  }

  async fetchFilmsByName() {
    const query2 = await axios.get(
      `${BASE_URL}search/movie?api_key=${API_KEY}&query=${this.searchQuery}`
    );
    console.log(query2.data);
    return query2.data.results;
  }

  async fetchFilmsById(id) {
    const query1 = await axios.get(
      `${BASE_URL}movie/${id}?api_key=${API_KEY}&append_to_response=videos`
    );
    console.log(query1.data);
    return query1.data;
  }

  incrementPage() {
    this.filmsPage += 1;
    console.log(this.filmsPage);
  }

  resetPage() {
    this.filmsPage = 1;
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
