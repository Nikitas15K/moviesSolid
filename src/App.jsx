import { Routes, Route } from "@solidjs/router";
import { createResource, createSignal, onMount } from "solid-js";
import { Footer } from "./components";
import { useMovies } from "./movieContext";
import { Favorites, Home } from "./screens";

export const [searchTerm, setSearchTerm] = createSignal("");

function App() {
  const [movieData, { addMovie }] = useMovies();
  const [pageId, setPageId] = createSignal(1);
  const [movies, { refetch }] = createResource(pageId, fetchMovies);

  async function fetchMovies(pageId) {
    const queryURL =
      import.meta.env.VITE_APP_API_BASE_URL +
      "?api_key=" +
      import.meta.env.VITE_APP_TMDB_API_KEY +
      "&page=" +
      pageId;
    const slow = await new Promise((resolve) => setTimeout(resolve, 500));
    const result = await fetch(queryURL);
    if (!result.ok) {
      throw new Error("Error " + result.status);
    }
    const { results } = await result?.json();
    results?.forEach((movie) => {
      addMovie(movie);
    });
  }

  const getTopRatedMovies = async () => {
    for (let i = 1; i < 41; i++) {
      setPageId(i);
      await refetch();
    }
  };

  onMount(async () => {
    await getTopRatedMovies();
  });

  return (
    <div>
      <Show when={!movies?.error} fallback={<div>{data.error.message}</div>}>
        <Routes>
          <Route path="/" component={<Home />} />
          <Route path="/favorites" component={<Favorites />} />
        </Routes>
        <Footer />
      </Show>
    </div>
  );
}

export default App;
