import { refs } from '../refs';
import { getUserData } from '../firebase';
import { MovieService, MovieService } from '../fetchservice';
import { checkPoster } from '../components/checkposter';

const movieService = new MovieService();

export const libraryFetch = type => {
  getUserData().then(r => {
    if (r[type]) {
      Promise.all(movieService.fetchByMultipleIds(r[type])).then(r => {
        document.body.setAttribute('data-page', type);
        createLybraryMarckup(r);
      });
    } else {
      refs.lybraryGallery.innerHTML = '';
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
              <span class="main-film-premiere">${
                release_date ? release_date.slice(0, 4) : ''
              }</span>
            </p>
          </li>
          `;
    }
  );

  refs.lybraryGallery.innerHTML = '';
  refs.lybraryGallery.insertAdjacentHTML('beforeend', markup.join(''));
}
