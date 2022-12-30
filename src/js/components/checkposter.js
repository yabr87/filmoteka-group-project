import noPoster from '../../images/poster-null.jpg';

export function checkPoster(poster_path) {
  let poster = ``;
  if (poster_path) {
    return (poster = `https://image.tmdb.org/t/p/w300${poster_path}`);
  } else {
    return (poster = noPoster);
  }
}
