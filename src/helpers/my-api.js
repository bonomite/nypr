const apiKey = '9e0e3fea734301f2135b9ab28c9d8be5';


const getPopularMovies = (page) => {

  const requestedPage = page ? page : '1';

  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${requestedPage}`,
  ).then(res => res.json());

};

const getMovie = (id) => {

  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
  ).then(res => res.json());

};

const getVideos = (id) => {

  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`,
  ).then(res => res.json());

};
const getSimilarMovies = (page,id) => {

  const requestedPage = page ? page : '1';

  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=${requestedPage}`,
  ).then(res => res.json());

};

const getSearch = (query) => {
  if(query !== ''){
    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${query}`,
    ).then(res => res.json());
  }

};

export {getPopularMovies, getMovie, getVideos, getSimilarMovies, getSearch};
