import { refs } from './refs';

import './markup/libraryMarkup';

import { libraryFetch } from './markup/libraryMarkup';
import { onFilmClick } from './render/rendermodal';
import { footerModal } from './render/footer-modal';
import { MakeAuthBtn } from './firebase';
import { refs } from './refs';
import { Loading } from 'notiflix';

const onEmptyLibraryPageLoading = () => {
  Loading.hourglass('Add film to the list first', refs.loadOptions);
  Loading.remove(5000);
  setTimeout(() => {
    return (location.href = 'index.html');
  }, 5000);
};
onEmptyLibraryPageLoading();

import { Loading } from 'notiflix';

const onEmptyLibraryPageLoading = () => {
  Loading.circle('Add film to the list first');
  Loading.remove(5000);
  setTimeout(() => {
    return (location.href = '../index.html');
  }, 5000);
};
onEmptyLibraryPageLoading();

const onHeaderBtnsClick = e => {
  const btnType = e.target.dataset.type;
  if (!btnType) {
    return;
  }
  if (btnType === 'queue') {
    e.target.setAttribute('data-test', 'current');
    libraryFetch('Queue');
  }
  if (btnType === 'watched') {
    e.target.setAttribute('data-test', 'current');
    libraryFetch('Watched');
  }
};

refs.lybraryBtnsWrap.addEventListener('click', onHeaderBtnsClick);

refs.lybraryGallery.addEventListener('click', onFilmClick);

libraryFetch('Queue');
