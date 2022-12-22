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
          <h2 class="main-film-name">${title}</h2>
          <p class="main-film-description">
            <span class="main-film-genres">${movieService
              .getGenresByIds(genre_ids)
              .join(', ')}</span> |
            <span class="main-film-premiere">${release_date.slice(0, 4)}</span>
          </p>
        </li>
        `;
    })
    .join('');
}
