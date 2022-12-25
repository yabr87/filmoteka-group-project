import { refs } from './refs';
import Pagination from 'tui-pagination';
import { MovieService } from './fetchservice';
import { createGalleryMarckup } from './markup/homepage';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const movieService = new MovieService();

export const mainPageOnPaginClick = evt => {
  Loading.hourglass(refs.loadOptions);
  movieService.page = evt.page;
  refs.mainLibrary.innerHTML = '';
  movieService.getTrending().then(r => {
    refs.mainLibrary.insertAdjacentHTML(
      'beforeend',
      createGalleryMarckup(r.results)
    );
    Loading.remove();
  });
};

export function paginationMainPage(totalPage, onPaginationClickCallback) {
  const optionsMainPagination = {
    totalItems: totalPage,
    itemsPerPage: 1,
    visiblePages: 5,
    template: {
      page: '<a href="#" class="pagination-btn">{{page}}</a>',
      currentPage:
        '<strong class="pagination-btn current-page-btn">{{page}}</strong>',
      moveButton:
        '<a href="#" class="move-btns pagination-btn tui-{{type}}">' +
        '<span class="btn-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class=" tui-is-disabled tui-{{type}}">' +
        '<span class="btn-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class=" tui-{{type}}-is-ellip">' +
        '<span class="pagination-btn btn-ellip">...</span>' +
        '</a>',
    },
  };

  const pagination = new Pagination(
    refs.paginationContainer,
    optionsMainPagination
  );

  pagination.on('beforeMove', onPaginationClickCallback);
}
