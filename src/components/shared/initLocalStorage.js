//local storage init for favorite hearts
const initLocalStorage = () => {
  const allFavoriteMoviesArr = localStorage.getItem("allFavoriteMoviesArr");
  return (allFavoriteMoviesArr && allFavoriteMoviesArr.length) ? JSON.parse(allFavoriteMoviesArr) : [];
};

export default initLocalStorage;