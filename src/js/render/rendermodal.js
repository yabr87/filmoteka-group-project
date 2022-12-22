// доробити розмітку модалки
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { refs } from '../refs';
import { MovieService } from '../fetchservice';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const movieService = new MovieService();

export async function onFilmClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) return;

  Loading.hourglass({
    clickToClose: true,
    svgSize: '200px',
    svgColor: '#FF6B01',
  });
  const film = await movieService.getMovieDetails(
    event.target.parentNode.dataset.id
  );
  Loading.remove();

  let modalMurkup = await markupModal(film);
  let trailerMurkup = await murkupTrailer(film);

  const modalLightbox = basicLightbox.create(modalMurkup, {
    onShow: () => {
      // modalLightbox.element()
      //   .querySelector('.js-btn-queue')
      //   .addEventListener('click', onBtnQueClick);

      modalLightbox.element().querySelector('.js-btn-queue').onclick =
        onBtnQueClick;

      modalLightbox.element().querySelector('.js-btn-watched').onclick =
        onBtnWatchedClick;

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
    Loading.hourglass({
      clickToClose: true,
      svgSize: '200px',
      svgColor: '#FF6B01',
    });
    trailer.show();
    Loading.remove();
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
          class="btn modal-watched-btn js-btn-watched"
          data-id="${id}"
          data-type="Watched"
        >
          ${w ? 'remove to watced' : 'add to watced'}
        </button>
        <br/>
        <br/>
        <br/>
        <button class="btn modal-queue-btn js-btn-queue" data-id="${id}" data-type="Queue">
          ${q ? 'remove to watced' : 'add to watced'}
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

let q = true;
let w = true;

function onBtnQueClick(event) {
  if (q) {
    q = false;
    event.target.textContent = `add to queue`;
    console.log(q);
    return;
  } else {
    q = true;
    event.target.textContent = `remove to queue`;
    console.log(q);
    return;
  }
}

function onBtnWatchedClick(event) {
  if (w) {
    w = false;
    event.target.textContent = `add to watced`;
    console.log(w);
    return;
  } else {
    w = true;
    event.target.textContent = `remome to watced`;
    console.log(w);
    return;
  }
}

refs.mainLibrary.addEventListener('click', onFilmClick);
