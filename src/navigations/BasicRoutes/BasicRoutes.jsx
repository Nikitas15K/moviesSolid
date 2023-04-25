import { Route, Routes } from "@solidjs/router";
import { createResource, createSignal, onMount } from "solid-js";
import { useMovies } from "../../context/movieContext";
import { Actor, Favorites, Home } from "../../screens";

function BasicRoutes() {
  const [movies] = useMovies();
  const [movieData, { addMovie }] = movies;

  const [pageId, setPageId] = createSignal(1);
  const [movieResult, { refetch }] = createResource(pageId, fetchMovies);

  async function fetchMovies(pageId) {
    const queryURL =
      import.meta.env.VITE_APP_API_BASE_URL +
      "top_rated?api_key=" +
      import.meta.env.VITE_APP_TMDB_API_KEY +
      "&page=" +
      pageId;
    const result = await fetch(queryURL)
      .then((result) => {
        return result?.json();
      })
      .catch((error) => {});
    result?.results?.forEach((movie) => {
      addMovie(movie);
    });
  }

  const getTopRatedMovies = async () => {
    for (let i = 1; i < 41; i++) {
      setPageId(i);
      await refetch();
    }
  };

  onMount(() => {
    getTopRatedMovies();
  });

  return (
    <Show when={!movieResult?.error} fallback={movieResult?.error}>
      <Route path="/" end element={<Home />} />
      <Route path="/favorites" end element={<Favorites />} />
      <Route path="/actor" end element={<Actor />} />
    </Show>
  );
}

export default BasicRoutes;
