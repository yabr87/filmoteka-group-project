import { MovieService } from './fetchservice';


const form = document.querySelector('#search-form');
const gallery = document.querySelector('.main-library-item');
let searchTerm;
let movieService = new MovieService();

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    searchTerm = event.target.searchQueue.value.trim();
    let data = await movieService.search(searchTerm, 1);
    gallery.insertAdjacentHTML("beforeend", createGalleryMarckup(data.results));
};

function createGalleryMarckup(response) {
    return response
        .map(({poster_path, backdrop_path, title, release_date, genre_ids}) => {
            return `
            
                <a href="${movieService.getPosterPath(backdrop_path)}">
                    <img class="card-img" src="${movieService.getPosterPath(poster_path)}" alt="${title}" loading="lazy" />
                </a>
                <div class="info">
                    <p class="info-item">
                    <b >${title}</b>
                    </p>
                    <p class="info-item">
                    <b>${movieService.getGenresByIds(genre_ids)}</b>
                    </p>
                    <p class="info-item">
                    <b >${extractYear(release_date)}</b>
                    </p>
                </div>
        `}).join('');    
};

function extractYear(fullDate) {
    return fullDate.slice(0, 4);
}