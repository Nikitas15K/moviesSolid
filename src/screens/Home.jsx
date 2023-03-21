import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import { searchTerm, setSearchTerm } from "../App";
import { Header, MovieCard } from "../components";
import { useMovies } from "../movieContext";

function Home() {
  const navigate = useNavigate();
  const [movieData, { movieDataFiltered, editIfFavorite }] = useMovies();
  const [heartClicked, setHeartClicked] = createSignal(0);
  const [num, setNum] = createSignal(0);

  const showFavorite = (id, favorite) => {
    editIfFavorite(id);
    if (!favorite) {
      setHeartClicked(id);
      const timer = setInterval(() => setNum((num() + 0.001) % 0.5), 10);
    } else {
      setHeartClicked(0);
      setNum(0);
    }
  };

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
                onClick={() => {
                  showFavorite(movie?.id, movie.favorite);
                }}
                num={heartClicked() === movie.id ? num() : 0}
              />
            );
          }}
        </For>
      </div>
    </div>
  );
}

export default Home;
