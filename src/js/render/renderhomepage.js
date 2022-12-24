import { refs } from '../refs';
import { MovieService } from '../fetchservice';
import { createGalleryMarckup } from '../markup/homepage';
import {
  paginationMainPage,
  mainPageOnPaginClick,
  searchOnPaginClick,
} from '../paginationhomepage';

export async function renderhomepage() {
  const movieService = new MovieService();

  const data = await movieService.getTrending();

  paginationMainPage(data.total_pages, mainPageOnPaginClick);

  refs.mainLibrary.insertAdjacentHTML(
    'beforeend',
    createGalleryMarckup(data.results)
  );
}

renderhomepage();
