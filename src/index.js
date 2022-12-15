import { refs } from './js/refs';
import ApiService from './js/fetchservice';

import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
const pagination = new Pagination('pagination');

function render(data) {
  const articlesList = data.hits.map(murkup);
}

const apiService = new ApiService();

apiService.fetchArticles();

apiService.fetchArticles1();
