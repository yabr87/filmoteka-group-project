import { refs } from './refs';
import { MovieService } from './fetchservice';
import { createGalleryMarckup } from './markup/homepage';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const movieService = new MovieService();

refs.form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  let searchTerm = event.target.searchQueue.value.trim();
  if (searchTerm === '' || searchTerm.length <= 2) {
    refs.serchError.classList.remove('is-hidden');
    return;
  }

  Loading.hourglass(refs.loadOptions);
  let data = await movieService.search(searchTerm, 1);
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

  refs.mainLibrary.insertAdjacentHTML(
    'beforeend',
    createGalleryMarckup(data.results)
  );
}

function cleareOldSerch() {
  page = 1;
  searchTerm = '';
  refs.mainLibrary.innerHTML =
    'якась розмітка з якимось текстом. по типу "упсс нічого не знайшлось". Красівоє конешно ))))?';
  refs.form.reset();
}
