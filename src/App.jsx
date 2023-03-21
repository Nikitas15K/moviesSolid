import { Routes, Route } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { Footer } from "./components";
import { useMovies } from "./movieContext";
import { Favorites, Home } from "./screens";

export const [searchTerm, setSearchTerm] = createSignal("");

function App() {
  const [movieData, { addMovie }] = useMovies();
  const queryURL =
    import.meta.env.VITE_APP_API_BASE_URL +
    "?api_key=" +
    import.meta.env.VITE_APP_TMDB_API_KEY +
    "&page=";

  const getTopRatedMovies = async () => {
    for (let i = 1; i < 41; i++) {
      const fetchMovies = await fetch(queryURL + i);
      const result = await fetchMovies.json();
      result?.results?.forEach((movie) => {
        addMovie(movie);
      });
    }
  };

  onMount(async () => {
    await getTopRatedMovies();
  });

  return (
    <div>
      <Routes>
        <Route path="/" component={<Home />} />
        <Route path="/favorites" component={<Favorites />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
