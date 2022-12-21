import { refs } from './refs';
import { MovieService } from './fetchservice';
import { createGalleryMarckup } from './markup/homepage';
const movieService = new MovieService();

refs.form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  let searchTerm = event.target.searchQueue.value.trim();
  let data = await movieService.search(searchTerm, 1);

  // чистимо контейнер!!!
  refs.mainLibrary.innerHTML = '';

  // вставляємо розмітку в контейнер UL, а не в лішку !!!
  refs.mainLibrary.insertAdjacentHTML(
    'beforeend',
    createGalleryMarckup(data.results)
  );
}

// виносимо розмітку в інший файл './markup/homepage';
