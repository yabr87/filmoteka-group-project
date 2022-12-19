import { refs } from '../refs';
import ApiService from '../fetchservice';
const apiService = new ApiService();

const murkupMyLybrary = ({
  poster_path,
  title,
  original_title,
  genre,
  release_date,
  vote_average,
}) => {
  return `<li class="library-item" data-id="${id}">
      
        <img class="film-poster" src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}"/>
        <p class="film-name">${title}</p>
         <p class="film-descr">
          ${genre.join(', ')} | ${release_date.slice(0, 4)}
        </p>
        <p class="vote">${vote_average} </p>

      
    </li>`;
};
