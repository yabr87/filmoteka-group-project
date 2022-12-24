import { refs } from './refs';
import Pagination from 'tui-pagination';
import { MovieService } from './fetchservice';
import { createGalleryMarckup } from './markup/homepage';

const movieService = new MovieService();

export const mainPageOnPaginClick = evt => {
  movieService.page = evt.page;
  refs.mainLibrary.innerHTML = '';
  movieService.getTrending().then(r => {
    refs.mainLibrary.insertAdjacentHTML(
      'beforeend',
      createGalleryMarckup(r.results)
    );
  });
};

export function paginationMainPage(totalPage, onPaginationClickCallback) {
  const optionsMainPagination = {
    totalItems: totalPage,
    itemsPerPage: 1,
    visiblePages: 5,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    usageStatistics: true,
    defaultTemplate: {
      page: '<a href="#" class="tui-page-btn ">{{page}}</a>',
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

  const pagination = new Pagination(
    refs.paginationContainer,
    optionsMainPagination
  );

  pagination.on('beforeMove', onPaginationClickCallback);
}
