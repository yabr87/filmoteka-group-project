import { refs } from './refs';
import { renderHomePage } from './render/renderhomepage';
import Pagination from 'tui-pagination';
import ApiService from './fetchservice';

const moviesService = new ApiService();

export function paginationMainPage(call) {
  const container = document.getElementById('paginationhomepage');
  const optionsMainPagination = {
    totalItems: 20,
    itemsPerPage: 1,
    visiblePages: 5,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    usageStatistics: true,
    defaultTemplate: {
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

  const pagination = new Pagination(container, optionsMainPagination);

  pagination.on('beforeMove', evt => {
    console.log(evt.page);
    moviesService.page = evt.page;
    refs.mainLibrary.innerHTML = '';
    ApiService.fetchTrendingFilms().then(r => {
      renderHomePage(r);
    });
  });
}
