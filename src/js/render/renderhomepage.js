import { refs } from '../refs';
import { MovieService } from '../fetchservice';
import { createGalleryMarckup } from '../markup/homepage';

const movieService = new MovieService();

async function renderhomepage(page = 1) {
  const data = await movieService.getTrending(page);
  console.log(data);

  refs.mainLibrary.insertAdjacentHTML(
    'beforeend',
    createGalleryMarckup(data.results)
  );
}

renderhomepage();
