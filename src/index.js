import ApiService from './js/fetchservice';
import { refs } from './js/refs';
import { paginationHomePage } from './js/paginationhomepage';
import { onFilmClick } from './js/render/rendermodal';

const apiService = new ApiService();

import { renderHomePage } from './js/render/renderhomepage';

async function start() {
  let trendingFilms = await apiService.fetchTrendingFilms();
  renderHomePage(trendingFilms);
  paginationHomePage();
}

start();

refs.mainLibrary.addEventListener('click', onFilmClick);
