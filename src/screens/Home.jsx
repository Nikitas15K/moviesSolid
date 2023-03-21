import { useNavigate } from "@solidjs/router";
import { searchTerm, setSearchTerm } from "../App";
import { Header, MovieCard } from "../components";
import { useMovies } from "../movieContext";

function Home() {
  const navigate = useNavigate();
  const [movieData, { movieDataFiltered, editIfFavorite }] = useMovies();
  return (
    <div>
      <Header
        placeholderSearch="all movies"
        searchTerm={searchTerm()}
        onClick={() => {
          navigate("/favorites");
          setSearchTerm("");
        }}
        onInput={(event) => {
          setSearchTerm(event.target.value);
        }}
      />

      <div className="cardset">
        <For each={movieDataFiltered(searchTerm())}>
          {(movie) => {
            return (
              <MovieCard
                movie={movie}
                onClick={() => editIfFavorite(movie?.id)}
              />
            );
          }}
        </For>
      </div>
    </div>
  );
}

export default Home;
