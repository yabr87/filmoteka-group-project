import * as basicLightbox from 'basiclightbox';
import { request } from './requestAPI';
import { markup } from './markup';
import { render } from './render';
import { ref } from './ref';

const randomBtn = document.querySelector('.js-random-btn');

randomBtn.addEventListener('click', onClickRandom);

async function onClickRandom(e) {
  e.preventDefault();
  let randomId = Math.round(Math.random() * 10000);
  randomMovie(randomId);
  async function randomMovie(id) {
    try {
      const findedRandomMovie = await request.movieId(`${id}`);
      if (!findedRandomMovie) {
        randomId = Math.round(Math.random() * 10000);
        randomMovie(randomId);
        return;
      }

      try {
        request.query =
          findedRandomMovie.original_title || findedRandomMovie.original_name;

        const data = await request.input();
        data.results = data.results.slice(0, 1);
        ref.pagination.classList.add('is-hidden');
        const genres = await request.genres();
        render.print(data, genres, markup.gallery);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {}
  }
}
