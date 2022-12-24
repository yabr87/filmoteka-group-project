import { refs } from '../refs';
import { MovieService } from '../fetchservice';
import { createGalleryMarckup } from '../markup/homepage';
import { renderhomepage } from './renderhomepage';

const movieService = new MovieService();

refs.cartoonsButton = document.querySelector('.genres');
const genreButtons = [...refs.cartoonsButton.children];

refs.cartoonsButton.addEventListener('click', renderGenre);

let requiredGenreId;
const requiredLength = 20;

async function renderGenre(event) {
  // Ми не хочемо реєструвати кліки з div
  if (event.target.nodeName === 'DIV') {
    return;
  }

  // Якщо клік на all, повертаємо кнопки пагінації
  if (event.target.dataset.key === 'all') {
    refs.mainLibrary.innerHTML = '';
    renderhomepage();
    refs.paginationContainer.classList.remove('is-hidden');

    normalizeButtons();
    event.target.classList.add('active-genre');
    return;
  }

  requiredGenreId = Number(event.target.dataset.key); //дістаємо з натиснутої кнопки id жанру

  //прибираємо з усіх кнопок клас active-genre
  normalizeButtons();
  //додаємо тільки на ту, що натиснули
  event.target.classList.add('active-genre');

  let genreFromPage = [];
  let AllCartoons = [];
  let movieArr;

  //завжди набивати масив з першої сторінки трендів
  movieService.page = 1;

  //набираємо 20 елементів в масив
  while (AllCartoons.length < requiredLength) {
    const data = await movieService.getTrending();
    movieArr = data.results;
    genreFromPage = movieArr.filter(movie =>
      movie.genre_ids.includes(requiredGenreId)
    );

    AllCartoons = AllCartoons.concat(genreFromPage);
    movieService.page += 1;
  }

  //очистили, відрендерили
  refs.mainLibrary.innerHTML = '';
  refs.mainLibrary.insertAdjacentHTML(
    'beforeend',
    createGalleryMarckup(AllCartoons)
  );

  //приховали пагінацію
  refs.paginationContainer.classList.add('is-hidden');
}

function normalizeButtons() {
  genreButtons.map(child => {
    child.classList.remove('active-genre');
  });
}
