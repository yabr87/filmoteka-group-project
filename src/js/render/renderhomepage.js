import { refs } from '../refs';
import { MovieService } from '../fetchservice';
import { createGalleryMarckup } from '../markup/homepage';

const movieService = new MovieService();

async function renderhomepage() {
  const data = await movieService.getTrending(1);
  console.log(data);

  refs.mainLibrary.insertAdjacentHTML(
    'beforeend',
    createGalleryMarckup(data.results)
  );
}

renderhomepage();
