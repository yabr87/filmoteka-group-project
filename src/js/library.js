import { refs } from './refs';

import './markup/libraryMarkup';

import { libraryFetch } from './markup/libraryMarkup';
import { onFilmClick } from './render/rendermodal';
import { footerModal } from './render/footer-modal';
import { MakeAuthBtn } from './firebase';
import { refs } from './refs';
import { Loading } from 'notiflix';

import { Loading } from 'notiflix';

const onHeaderBtnsClick = e => {
  const btnType = e.target.dataset.type;
  if (!btnType) {
    return;
  }
  if (btnType === 'queue') {
    document.body.setAttribute('data-page', 'Queue');
    libraryFetch('Queue');
    refs.lybraryWatchedBtn.classList.remove('current-lib-btn');
    refs.lybraryQueueBtn.classList.add('current-lib-btn');
  }
  if (btnType === 'watched') {
    document.body.setAttribute('data-page', 'Watched');
    libraryFetch('Watched');
    refs.lybraryQueueBtn.classList.remove('current-lib-btn');
    refs.lybraryWatchedBtn.classList.add('current-lib-btn');
  }
};

refs.lybraryBtnsWrap.addEventListener('click', onHeaderBtnsClick);
refs.lybraryGallery.addEventListener('click', onFilmClick);
refs.lybraryQueueBtn.classList.add('current-lib-btn');
document.body.setAttribute('data-page', 'Queue');

libraryFetch('Queue');

MakeAuthBtn();
