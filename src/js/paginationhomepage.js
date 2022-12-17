// ES6
import { refs } from './refs';
import { renderHomePage } from './render/renderhomepage';

import Pagination from 'tui-pagination';
import ApiService from './fetchservice';
import { refs } from './refs';

const apiService = new ApiService();

export function paginationHomePage(call) {
  const container = document.getElementById('paginationhomepage');
  const options = {
    // below default value of options
    totalItems: 20,
    itemsPerPage: 1,
    visiblePages: 5,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  const pagination = new Pagination(container, options);

  pagination.on('afterMove', event => {
    console.log(event.page);
    apiService.page = event.page;
    refs.mainLibrary.innerHTML = '';
    apiService.fetchTrendingFilms().then(r => {
      renderHomePage(r);
      window.scrollTo(0, 0);
    });
  });
}
