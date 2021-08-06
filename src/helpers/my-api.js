const apiKey = '9e0e3fea734301f2135b9ab28c9d8be5';


const getPopularMovies = (page) => {

  const requestedPage = page ? page : '1';

  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${requestedPage}`,
  ).then(res => res.json());

};

export {getPopularMovies};
