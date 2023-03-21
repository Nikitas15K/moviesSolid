export const getFavoriteMoviesFromLocalStorage = () => {
  return localStorage
    .getItem("favoriteMovies")
    ?.split(",")
    ?.map((str) => {
      return parseInt(str);
    });
};

export const editIfMovieIsFavoriteInLocalStorage = (id) => {
  try {
    let favoriteMovies = getFavoriteMoviesFromLocalStorage();
    if (!favoriteMovies || favoriteMovies?.length === 0) {
      console.log(favoriteMovies);
      localStorage.setItem("favoriteMovies", id?.toString());
    } else {
      if (favoriteMovies?.includes(id)) {
        let updatedFavorites = favoriteMovies?.filter(
          (movieId) => movieId !== id
        );
        localStorage.setItem("favoriteMovies", updatedFavorites?.toString());
      } else {
        favoriteMovies?.push(id);
        localStorage.setItem("favoriteMovies", favoriteMovies?.toString());
      }
    }
  } catch (e) {
    console.log(e);
  }
};
