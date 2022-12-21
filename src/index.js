import ApiService from './js/fetchservice';
import { refs } from './js/refs';
import { paginationHomePage } from './js/paginationhomepage';
import { onFilmClick } from './js/render/rendermodal';
import { MovieService } from './js/fetchservice';


// const submitBtn = document.querySelector(".btn");


let movieService = new MovieService();

movieService.getTrending(
    {
        mediaType: "all",
        timeWindow: "week",
        page: "1",
        title: "Avatar: The Way of Water",
        vote_average: "7",
        popularity: "4650.217",
        release_date: "2022-12-14",
    }
).then(res => {
    console.log(res);
});

movieService.search(
    {
        query:"gladiator",
        page:"1",
        include_adult:"false",
        region:"USA",
        year:"2005",
        primary_release_year: "2005-06-07",
        language:"en-US"
    }
).then(res => {
    console.log(res);
})

movieService.getMovieDetailі(76600).then(res => {
    console.log(res);
})

movieService.getByGenre("action").then(res => {
    console.log(res);
})
