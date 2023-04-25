import { searchTerm, setSearchTerm } from "../../App";
import { Header, MovieCard } from "../../components";
import { useMovies } from "../../context/movieContext";
import { movieDataFiltered } from "../../helpers/helpers";

function Favorites() {
  const [movies] = useMovies();
  const [movieData, { editIfFavorite }] = movies;

  return (
    <div>
      <Header
        placeholderSearch="favorites"
        searchTerm={searchTerm()}
        onInput={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <div className="cardset">
        <For each={movieDataFiltered(movieData, searchTerm(), true)}>
          {(movie) => {
            return (
              <MovieCard
                movie={movie}
                onClick={() => editIfFavorite(movie?.id)}
                num={0}
              />
            );
          }}
        </For>
      </div>
    </div>
  );
}

export default Favorites;
