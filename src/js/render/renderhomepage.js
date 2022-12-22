import { refs } from '../refs';
import { MovieService } from '../fetchservice';
import { createGalleryMarckup } from '../markup/homepage';
import { paginationMainPage } from '../paginationhomepage';

const movieService = new MovieService();

async function renderhomepage() {
  const data = await movieService.getTrending();
  console.log(data);
  paginationMainPage(data.total_pages);
  refs.mainLibrary.insertAdjacentHTML(
    'beforeend',
    createGalleryMarckup(data.results)
  );
}

renderhomepage();
