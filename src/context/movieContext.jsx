import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import {
  checkIfMovieArrayHasFavoriteMovies,
  editIfMovieIsFavoriteInLocalStorage,
  getFavoriteMoviesFromLocalStorage,
} from "../helpers/helpers";
import myMovies from "../plain_data.json";

const initialState = {
  movieData: checkIfMovieArrayHasFavoriteMovies(myMovies),
};

const MoviesContext = createContext([]);

export function MoviesProvider(props) {
  const [movieData, setMovieData] = createStore(
    props.movieData || initialState.movieData
  );
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
  const [actorData, setActorData] = createStore([]);
  const actors = [
    actorData,
    {
      addActor(actor) {
        setActorData([
          ...actorData,
          {
            id: actor.id,
            name: actor.name,
            isFavorite: true,
          },
        ]);
      },
      editIfFavorite(id) {
        setActorData(
          (actor) => actor?.id === id,
          "isFavorite",
          (isFavorite) => !isFavorite
        );
      },
    },
  ];
  return (
    <MoviesContext.Provider value={[movies, actors]}>
      {props.children}
    </MoviesContext.Provider>
  );
}
export function useMovies() {
  return useContext(MoviesContext);
}
