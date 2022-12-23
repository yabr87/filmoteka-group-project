// доробити розмітку модалки
import Notiflix from 'notiflix';

import { refs } from '../refs';
import { MovieService } from '../fetchservice';
import { getCurrentUser, getUserData, manageUserData } from '../firebase';
import closeBtn from '../../images/close.svg';

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
      // modalLightbox.element()
      //   .querySelector('.js-btn-queue')
      //   .addEventListener('click', onBtnQueClick);

      modalLightbox.element().querySelector('.js-btn-queue').onclick =
        onBtnQueClick;

      modalLightbox.element().querySelector('.js-btn-watched').onclick =
        onBtnWatchedClick;

      modalLightbox.element().querySelector('.trailer-btn').onclick =
        showTrailer;

      modalLightbox.element().querySelector('.modal-close').onclick =
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

  const ifUserSignin = await getCurrentUser();

  // console.log(genres);
  console.log(videos.results.length);
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
          data-type="Watched">remove to Watched</button>
        <button class="modal-btn js-btn-queue ${
          ifUserSignin ? '' : 'disabled'
        }" data-id="${id}" data-type="Queue" 
        >Remove to queue</button>
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

async function onBtnQueClick(event) {
  if (event.target.classList.contains('disabled')) {
    Notiflix.Notify.failure('Log in first!', refs.mesageOption);
    return;
  }
  const userData = await getUserData();

  if (userData.Watched.includes(event.target.dataset.id)) {
    console.log('такий фільм є');
  } else {
    console.log('такого немає');
  }
}

async function onBtnWatchedClick(event) {
  if (event.target.classList.contains('disabled')) {
    Notiflix.Notify.failure('Log in first!', refs.mesageOption);
    return;
  }

  const userData = await getUserData();

  if (userData.Watched.includes(event.target.dataset.id)) {
    console.log('такий фільм є');
  } else {
    console.log('такого немає');
  }
}
