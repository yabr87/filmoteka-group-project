import { refs } from './refs';
import { MovieService } from './fetchservice';
import { createGalleryMarckup } from './markup/homepage';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { paginationMainPage } from './paginationhomepage';
import { deactivateTrendsBtn } from './components/deactivateTrendsBtn';

let searchTerm = '';
const movieService = new MovieService();

const searchOnPaginClick = evt => {
  Loading.hourglass(refs.loadOptions);

  movieService.page = evt.page;
  refs.mainLibrary.innerHTML = '';
  movieService.search().then(r => {
    refs.mainLibrary.insertAdjacentHTML(
      'beforeend',
      createGalleryMarckup(r.results)
    );
    Loading.remove(500);
  });
};

refs.form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  deactivateTrendsBtn();

  searchTerm = event.target.searchQueue.value.trim();
  if (searchTerm === '') {
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
    refs.paginationContainer.innerHTML = '';
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
  searchTerm = '';
  refs.mainLibrary.innerHTML = '';
  refs.form.reset();
}
