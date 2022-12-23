import { refs } from './refs';
import { MovieService } from './fetchservice';
import { createGalleryMarckup } from './markup/homepage';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { paginationMainPage } from './paginationhomepage';

let searchTerm = '';
const movieService = new MovieService();

const searchOnPaginClick = evt => {
  movieService.page = evt.page;

  refs.mainLibrary.innerHTML = '';
  movieService.search().then(r => {
    refs.mainLibrary.insertAdjacentHTML(
      'beforeend',
      createGalleryMarckup(r.results)
    );
  });
};

refs.form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  searchTerm = event.target.searchQueue.value.trim();
  if (searchTerm === '' || searchTerm.length <= 2) {
    refs.serchError.classList.remove('is-hidden');
    return;
  }

  movieService.searchQuery = searchTerm;

  Loading.hourglass(refs.loadOptions);
  let data = await movieService.search();
  Loading.remove();

  if (
    data === null ||
    data === undefined ||
    data === '' ||
    data.results.length === 0
  ) {
    refs.serchError.classList.remove('is-hidden');
    cleareOldSerch();
    return;
  } else {
    refs.serchError.classList.add('is-hidden');
  }
  cleareOldSerch();

  paginationMainPage(data.total_pages, searchOnPaginClick);

  refs.mainLibrary.insertAdjacentHTML(
    'beforeend',
    createGalleryMarckup(data.results)
  );
}

function cleareOldSerch() {
  // page = 1; немає такої змінної
  searchTerm = '';
  refs.mainLibrary.innerHTML = '';
  refs.form.reset();
}
