import ApiService from './js/fetchservice';
import { refs } from './js/refs';
import { paginationHomePage } from './js/paginationhomepage';
import { onFilmClick } from './js/render/rendermodal';
import { renderHomePage } from './js/render/renderhomepage';

const apiService = new ApiService();

async function start() {
  let trendingFilms = await apiService.fetchTrendingFilms();
  renderHomePage(trendingFilms);
  paginationHomePage();
}

start();

refs.mainLibrary.addEventListener('click', onFilmClick);
