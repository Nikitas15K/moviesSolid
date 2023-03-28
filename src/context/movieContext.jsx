import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import {
  editIfMovieIsFavoriteInLocalStorage,
  getFavoriteMoviesFromLocalStorage,
} from "../helpers/helpers";

export const MoviesContext = createContext([], () => {});

export function MoviesProvider(props) {
  const [movieData, setMovieData] = createStore(props.movieData || []);
  const movies = [
    movieData,
    {
      addMovie(movie) {
        let favorites = getFavoriteMoviesFromLocalStorage();
        const checkDuplicate = movieData?.indexOf(
          (movieInStore) => movieInStore.id === movie?.id
        );
        if (checkDuplicate === -1) {
          setMovieData([
            ...movieData,
            {
              id: movie?.id,
              title: movie.title,
              overview: movie.overview,
              poster_path: movie?.poster_path,
              isFavorite: favorites?.includes(movie?.id),
            },
          ]);
        }
      },
      editIfFavorite(id) {
        setMovieData(
          (movie) => movie?.id === id,
          "isFavorite",
          (isFavorite) => !isFavorite
        );
        editIfMovieIsFavoriteInLocalStorage(id);
      },
    },
  ];

  return (
    <MoviesContext.Provider value={movies}>
      {props.children}
    </MoviesContext.Provider>
  );
}
export function useMovies() {
  return useContext(MoviesContext);
}
