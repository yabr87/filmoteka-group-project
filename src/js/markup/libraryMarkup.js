import { refs } from '../refs';
import { getCurrentUser, getUserData } from '../firebase';
import { MovieService, MovieService } from '../fetchservice';
import { checkPoster } from '../components/checkposter';

import Notiflix from 'notiflix';

const movieService = new MovieService();

export const libraryFetch = type => {
  getCurrentUser().then(r => {
    if (!r) {
      console.log(r);
      Notiflix.Notify.failure('Log in first!', refs.mesageOption);
      return;
    }
  });

  getUserData().then(r => {
    if (r) {
      Promise.all(movieService.fetchByMultipleIds(r[type])).then(r => {
        createLybraryMarckup(r);
      });
    }
  });
};

function createLybraryMarckup(filmsArr) {
  let markup = filmsArr.map(
    ({ data: { poster_path, title, release_date, genres, id } }) => {
      const filmGenres = genres
        .map(genre => {
          return genre.name;
        })
        .join(', ');
      return `
          <li class="main-library-item" data-id="${id}">
            <img
              src="${checkPoster(poster_path)}"
              alt="${title}"
            class="main-film-poster"
            />
            <h2 class="main-film-name">${title}</h2>
            <p class="main-film-description" data-id="${id}">
              <span class="main-film-genres">${filmGenres}</span> |
              <span class="main-film-premiere">${release_date.slice(
                0,
                4
              )}</span>
            </p>
          </li>
          `;
    }
  );

  refs.lybraryGallery.innerHTML = '';
  refs.lybraryGallery.insertAdjacentHTML('beforeend', markup.join(''));
}

libraryFetch('Queue');
