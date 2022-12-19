// доробити розмітку модалки
import { refs } from '../refs';
import ApiService from '../fetchservice';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const apiService = new ApiService();

export async function onFilmClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) return;

  const film = await apiService.fetchFilmsById(
    event.target.parentNode.dataset.id
  );

  let modalMurkup = await markupModal(film);
  let trailerMurkup = await murkupTrailer(film);

  const modalLightbox = basicLightbox.create(modalMurkup, {
    onShow: () => {
      modalLightbox.element().querySelector('.trailer-btn').onclick =
        showTrailer;
      modalLightbox.element().querySelector('.close-btn').onclick =
        onModalLightboxClose;
      document.addEventListener('keydown', onModalLightboxClose);
    },
    onClose: () => {
      document.removeEventListener('keydown', onModalLightboxClose);
    },
  });

  modalLightbox.show();

  const trailer = basicLightbox.create(trailerMurkup);

  function showTrailer() {
    trailer.show();
  }

  function onModalLightboxClose(event) {
    if (event.code === 'Escape') {
      trailer.close();
      modalLightbox.close();
    } else {
      modalLightbox.close();
    }
  }
}

async function markupModal(film) {
  const {
    poster_path,
    title,
    original_title,
    overview,
    vote_count,
    vote_average,
    popularity,
    genres,
    videos,
    id,
  } = film;

  console.log(genres);
  console.log(videos.results);
  const filmGenres = genres.map(genre => genre.name).join(', ');

  let markup = `<div class="modal-container">
      <button type="button" class="close-btn">X</button>
      <button type="button" class="trailer-btn"
      }">trailer</button>
      <img
      src="https://image.tmdb.org/t/p/w300${poster_path}"
      alt="film poster"
      class="modal-poster"
    />
      <h2 class="modal-title">${title}</h2>
      <div class="film-stats">
        <ul class="list modal-categories">
          <li class="modal-categories-item"><p>Vote / Votes</p></li>
          <li class="modal-categories-item"><p>Popularity</p></li>
          <li class="modal-categories-item"><p>Original Title</p></li>
          <li class="modal-categories-item"><p>Genre</p></li>
        </ul>
        <ul class="list modal-stats">
          <li class="modal-stats-item">
            <p>
              <span class="modal-vote-average">${vote_average}</span> /
              <span class="modal-vote-count">${vote_count}</span>
            </p>
          </li>
          <li class="modal-stats-item"><p>${popularity}</p></li>
          <li class="modal-stats-item"><p>${original_title}</p></li>
          <li class="modal-stats-item"><p>${filmGenres}</p></li>
        </ul>
      </div>
      <h3 class="about-title">About</h3>
      <p class="modal-overview">${overview}</p>
      <div class="modal-btns-wrap">
        <button
          class="btn modal-watched-btn"
          data-id="${id}"
          data-type="Watched"
        >
          Add to watched
        </button>
        <button class="btn modal-queue-btn" data-id="${id}" data-type="Queue">
          Add to queue
        </button>
      </div>
    </div>`;
  return markup;
}

function murkupTrailer({ videos }) {
  const filmTrailer = videos.results.map(video => video.key);

  let markup = `<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/${filmTrailer[filmTrailer.length - 1]}"
  frameborder="0"
  allowfullscreen
  ></iframe>`;
  return markup;
}
