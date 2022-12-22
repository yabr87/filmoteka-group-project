import ApiService from './js/fetchservice';
import { refs } from './js/refs';

import { paginationMainPage } from './js/paginationhomepage';
import { onFilmClick } from './js/render/rendermodal';
import { MovieService } from './js/fetchservice';
import { search } from './js/search';
import { MakeAuthBtn } from './js/firebase';

import './js/render/rendermodal';
import './js/render/renderhomepage';

MakeAuthBtn();
paginationMainPage();
