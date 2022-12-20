import ApiService from './js/fetchservice';
import { refs } from './js/refs';
import { paginationHomePage } from './js/paginationhomepage';
import { onFilmClick } from './js/render/rendermodal';
import { MovieService } from './js/fetchservice';

let movieService = new MovieService();

movieService.getTrending(
    {
        mediaType: "all",
        timeWindow: "week"
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

movieService.getMovieDetails(76600).then(res => {
    console.log(res);
})

movieService.getMovieVideos(76600).then(res => {
    console.log(res);
})