export const getFavoriteMoviesFromLocalStorage = () => {
  return (
    localStorage
      .getItem("favoriteMovies")
      ?.split(",")
      ?.map((str) => {
        return parseInt(str);
      }) || []
  );
};

export const editIfMovieIsFavoriteInLocalStorage = (id) => {
  try {
    let favoriteMovies = getFavoriteMoviesFromLocalStorage();
    if (!favoriteMovies || favoriteMovies?.length === 0) {
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

export const movieDataFiltered = (
  movieData,
  searchTerm,
  onlyFavorites = false
) => {
  return movieData?.filter((movie) =>
    !onlyFavorites
      ? movie?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      : movie?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) &&
        movie?.isFavorite
  );
};

export const checkIfMovieArrayHasFavoriteMovies = (movieArray) => {
  let updatedFavorites = movieArray?.map((movie) => {
    if (getFavoriteMoviesFromLocalStorage()?.includes(movie?.id)) {
      movie.isFavorite = true;
    } else {
      movie.isFavorite = false;
    }
    return movie;
  });
  return updatedFavorites || [];
};
