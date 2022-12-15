export const murkupHomePage = ({
  poster_path,
  title,
  original_title,
  genre_ids /*тут не зрозуміло тут айдішки */,
  release_date,
}) => {
  return `<li class="library-item">
      <a href="./" class="library-item-link link">
        <img class="film-poster" src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}"/>
        <p class="film-name">${title}</p>
        <p class="film-descr">
          ${genre_ids.join(', ')} | ${release_date.slice(0, 4)}
        </p>
      </a>
    </li>`;
};

export const murkupMyLybrary = ({
  poster_path,
  title,
  original_title,
  genre_ids /*тут не зрозуміло тут айдішки */,
  release_date,
  vote_average,
}) => {
  return `<li class="library-item">
      <a href="./" class="library-item-link link">
        <img class="film-poster" src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}"/>
        <p class="film-name">${title}</p>
         <p class="film-descr">
          ${genre_ids.join(', ')} | ${release_date.slice(0, 4)}
        </p>
        <p class="vote">${vote_average} </p>

      </a>
    </li>`;
};

//доробити розмітку модалки
export const murkupModal = ({
  poster_path,
  title,
  original_title,
  genre_ids /*тут не зрозуміло тут айдішки */,
  release_date,
  vote_average,
  vote_count,
}) => {
  return `<div class="library-item">
      
        <img class="film-poster" src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}"/>
        <p class="film-name">${original_title}</p>
        <p class="vote"><span>${vote_average}</span> / ${vote_count}</p>
      
    </div>`;
};
