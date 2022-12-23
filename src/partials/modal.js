import { title } from 'process';

`<div class="modal">
<button type="button" class="trailer-btn">trailer</button>
  <div class="modal-cointeiner">
    <div class="modal-thumb-img">
      <button class="modal-close" data-modal-close><img src="/src/images/close.jpg" alt="button-close"></button>
      <img class="modal-img" src="https://image.tmdb.org/t/p/w300${poster_path}" alt="film ${title}">
    </div>
    <div class="modal-thumb-text">
      <h2 class="modal-title">${title}</h2>
      <ul class="modal-list">

        <li class="modal-item">
          <p class="modal-text">Vote / Votes</p>
          <p class="modal-texting"><span class="modal-rating-color">${vote_average}</span> / ${vote_count}</p>
        </li>

        <li class="modal-item">
          <p class="modal-text" class="modal-text">Popularity</p>
          <p class="modal-texting">${popularity}</p>
        </li>

        <li class="modal-item">
          <p class="modal-text">Original Title</p>
          <p class="modal-texting">${original_title}</p>
        </li>

        <li class="modal-item">
          <p class="modal-text">Genre</p>
          <p class="modal-texting">${filmGenres}</p>
        </li>

      </ul>
      <h3 class="modal-heading">About</h3>
      <p class="modal-text-p">${overview}</p>
      <div class="modal-cointainer-btn">
        <button class="modal-button js-btn-watched" data-id="${id}"
          data-type="Watched">add to Watched</button>
        <button class="modal-btn js-btn-queue" data-id="${id}" data-type="Queue"">add to queue</button>
      </div>

    </div>

  </div>
</div>`;
