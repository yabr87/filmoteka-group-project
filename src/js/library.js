import { refs } from './refs';

import './scroll';
import './markup/libraryMarkup';

import { libraryFetch } from './markup/libraryMarkup';
import { onFilmClick } from './render/rendermodal';
import { footerModal } from './render/footer-modal';

const onHeaderBtnsClick = e => {
  const btnType = e.target.dataset.type;
  if (!btnType) {
    return;
  }
  if (btnType === 'queue') {
    libraryFetch('Queue');
  }
  if (btnType === 'watched') {
    libraryFetch('Watched');
  }
};

refs.lybraryBtnsWrap.addEventListener('click', onHeaderBtnsClick);

refs.lybraryGallery.addEventListener('click', onFilmClick);
