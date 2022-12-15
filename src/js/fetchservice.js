import { refs } from './refs';
import axios from 'axios';

const API_KEY = 'a92a89ae507ae16c2ec6dfd84780d28c';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalPages = 0;
    this.perPage = 40;
  }

  async fetchArticles() {
    const query = await axios.get(
      `${BASE_URL}trending/movie/week?api_key=${API_KEY}&append_to_response=videos&page=${this.page}`
    );
    console.log(query.data);
    return query.data.results;
  }

  async fetchArticles1() {
    const query1 = await axios.get(
      `https://api.themoviedb.org/3/movie/157336?api_key=${API_KEY}`
    );
    console.log(query1.data);
    return query1.data.genres;
  }

  incrementPage() {
    this.page += 1;
    console.log(this.page);
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get isShownLoadMoreBtn() {
    return this.page < this.totalPages;
  }

  calckTotalPages(total) {
    return (this.totalPages = Math.ceil(total / this.perPage));
  }
}
