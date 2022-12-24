import ApiService from './js/fetchservice';
import { refs } from './js/refs';

import { onFilmClick } from './js/render/rendermodal';
import { MovieService } from './js/fetchservice';
import { search } from './js/search';
import { MakeAuthBtn } from './js/firebase';
import { footerModal } from './js/render/footer-modal';
import './js/theme-switcher';

// import './js/render/rendermodal';

import './js/render/renderhomepage';
import './js/scroll';

MakeAuthBtn();

refs.mainLibrary.addEventListener('click', onFilmClick);

import './js/render/renderGenre';
