import { useNavigate } from "@solidjs/router";
import { searchTerm, setSearchTerm } from "../../App";
import { Header, MovieCard } from "../../components";
import { useMovies } from "../../context/movieContext";
import { movieDataFiltered } from "../../helpers/helpers";

function Favorites() {
  const navigate = useNavigate();
  const [movieData, { editIfFavorite }] = useMovies();

  return (
    <div>
      <Header
        placeholderSearch="favorites"
        searchTerm={searchTerm()}
        onClick={() => {
          navigate("../");
          setSearchTerm("");
        }}
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
