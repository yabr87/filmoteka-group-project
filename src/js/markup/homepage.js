import { checkPoster } from '../components/checkposter';
import { MovieService } from '../fetchservice';

const movieService = new MovieService();

export function createGalleryMarckup(response) {
  return response
    .map(({ poster_path, title, release_date, genre_ids, id }) => {
      return `            
        <li class="main-library-item" data-id="${id}">
          <img
            src="${checkPoster(poster_path)}"
            alt="${title}"
          class="main-film-poster"
          />
          <h2 class="main-film-name theme-light">${title}</h2>
          <p class="main-film-description" data-id="${id}">
            <span class="main-film-genres">${movieService.getGenresByIdsLimited(genre_ids, 3, 'Others').join(', ')}</span> |
            <span class="main-film-premiere">${
              release_date ? release_date.slice(0, 4) : ''
            }</span>
          </p>
        </li>
        `;
    })
    .join('');
}