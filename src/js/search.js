import { refs } from './refs';
import { MovieService } from './fetchservice';
import { createGalleryMarckup } from './markup/homepage';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const movieService = new MovieService();

refs.form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  let searchTerm = event.target.searchQueue.value.trim();
  let data = await movieService.search(searchTerm, 1);
  if (data === null || data === undefined || data === ' ' || data.results.length === 0) {
    refs.serchError.classList.remove('is-hidden');
}else {
    refs.serchError.classList.add('is-hidden');
  }
    cleareOldSerch();
    Loading.hourglass({
    clickToClose: true,
    svgSize: '200px',
    svgColor: '#FF6B01',
  });
  refs.mainLibrary.insertAdjacentHTML(
    'beforeend',
    createGalleryMarckup(data.results)
  );

  Loading.remove();
}

function cleareOldSerch() {
    page = 1;
    searchTerm = '';
  refs.mainLibrary.innerHTML = '';
  refs.form.reset();
}
