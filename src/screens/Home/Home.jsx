import { createSignal } from "solid-js";
import { searchTerm, setSearchTerm } from "../../App";
import { Header, MovieCard } from "../../components";
import { useMovies } from "../../context/movieContext";
import { movieDataFiltered } from "../../helpers/helpers";

function Home() {
  const [movies] = useMovies();
  const [movieData, { editIfFavorite }] = movies;
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
        onInput={(event) => {
          setSearchTerm(event.target.value);
        }}
      />

      <div className="cardset">
        <For each={movieDataFiltered(movieData, searchTerm())}>
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
