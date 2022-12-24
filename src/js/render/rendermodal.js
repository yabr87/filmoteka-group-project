// доробити розмітку модалки
import Notiflix from 'notiflix';

import { refs } from '../refs';
import { MovieService } from '../fetchservice';
import { getCurrentUser, getUserData, manageUserData } from '../firebase';
import closeBtn from '../../images/close.svg';
import { libraryFetch } from '../markup/libraryMarkup';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { async } from '@firebase/util';
import { checkPoster } from '../components/checkposter';

const movieService = new MovieService();

export async function onFilmClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) return;

  Notiflix.Loading.hourglass(refs.loadOptions);
  const film = await movieService.getMovieDetails(
    event.target.parentNode.dataset.id
  );
  Notiflix.Loading.remove();

  let modalMurkup = await markupModal(film);
  let trailerMurkup = await murkupTrailer(film);

  const modalLightbox = basicLightbox.create(modalMurkup, {
    onShow: () => {
      document.body.style.overflow = 'hidden';
      // modalLightbox.element()
      //   .querySelector('.js-btn-queue')
      //   .addEventListener('click', onBtnQueClick);

      modalLightbox
        .element()
        .querySelector('.modal-cointainer-btn')
        .addEventListener('click', onModalBtnsClick);

      modalLightbox.element().querySelector('.trailer-btn').onclick =
        showTrailer;

      modalLightbox.element().querySelector('.modal-close').onclick =
        onModalLightboxClose;

      document.addEventListener('keydown', onModalLightboxClose);
    },
    onClose: () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', onModalLightboxClose);
    },
  });

  modalLightbox.show();

  const trailer = basicLightbox.create(trailerMurkup);

  function showTrailer() {
    Notiflix.Loading.hourglass(refs.loadOptions);
    trailer.show();
    Notiflix.Loading.remove();
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

  const userData = await getUserData();
  let isFilmInWatched = false;
  let isFilmInQueue = false;

  if (userData && userData.Watched) {
    isFilmInWatched = await userData.Watched.includes(id.toString());
  }
  if (userData && userData.Queue) {
    isFilmInQueue = await userData.Queue.includes(id.toString());
  }

  const ifUserSignin = await getCurrentUser();

  const filmGenres = genres.map(genre => genre.name).join(', ');

  let markup = `<div class="modal">

  <div class="modal-cointeiner">
  
  <button class="modal-close" data-modal-close><img src="${closeBtn}" alt="button-close"></button>
    <div class="modal-thumb-img">
      <button type="button" class="trailer-btn ${
        videos.results.length ? '' : 'is-hidden'
      }">trailer</button>
      <img class="modal-img" src="${checkPoster(
        poster_path
      )}" alt="film ${title}">
    </div>
    <div class="modal-thumb-text">
      <h2 class="modal-title">${title}</h2>
      <ul class="modal-list">

        <li class="modal-item">
          <p class="modal-text">Vote / Votes</p>
          <p class="modal-texting"><span class="modal-rating-color">${vote_average}</span> / ${vote_count}</p>
        </li>

        <li class="modal-item">
          <p class="modal-text" class="modal-text">Popularity</p>
          <p class="modal-texting">${popularity}</p>
        </li>

        <li class="modal-item">
          <p class="modal-text">Original Title</p>
          <p class="modal-texting">${original_title}</p>
        </li>

        <li class="modal-item">
          <p class="modal-text">Genre</p>
          <p class="modal-texting">${filmGenres}</p>
        </li>

      </ul>
      <h3 class="modal-heading">About</h3>
      <p class="modal-text-p">${overview}</p>
      <div class="modal-cointainer-btn">
        <button class="modal-btn js-btn-watched ${
          ifUserSignin ? '' : 'disabled'
        }" data-id="${id}"
          data-type="Watched">${
            isFilmInWatched ? 'Remove' : 'add to Watched'
          }</button>

        <button class="modal-btn js-btn-queue ${
          ifUserSignin ? '' : 'disabled'
        }" data-id="${id}" data-type="Queue" 
        >${isFilmInQueue ? 'Remove' : 'add to Queue'}</button>
      </div>

    </div>

  </div>
</div>`;
  return markup;
}

function murkupTrailer({ videos }) {
  const filmTrailer = videos.results.map(video => video.key);
  console.log(filmTrailer);
  let markup = `<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/${filmTrailer[filmTrailer.length - 1]}"
  frameborder="0"
  allowfullscreen
  ></iframe>`;

  return markup;
}

async function onModalBtnsClick(event) {
  const btnType = event.target.dataset.type;
  const filmId = event.target.dataset.id;
  const currentPage = document.body.dataset.page;

  if (!btnType) {
    return;
  }
  if (event.target.classList.contains('disabled')) {
    Notiflix.Notify.failure('Log in first!', refs.mesageOption);
    return;
  }

  if (btnType === 'Queue') {
    manageUserData(filmId, btnType);

    if (event.target.textContent === 'Remove') {
      event.target.textContent = 'Add to Queue';
    } else {
      event.target.textContent = 'Remove';
    }

    if (currentPage === 'Queue') {
      setTimeout(() => {
        libraryFetch(btnType);
      }, 1000);
    }
  }
  if (btnType === 'Watched') {
    manageUserData(filmId, btnType);
    if (event.target.textContent === 'Remove') {
      event.target.textContent = 'Add to Watched';
    } else {
      event.target.textContent = 'Remove';
    }

    if (currentPage === 'Watched') {
      setTimeout(() => {
        libraryFetch(btnType);
      }, 1000);
    }
  }
}
