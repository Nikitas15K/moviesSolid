import { Route, Routes } from "@solidjs/router";
import { createResource, createSignal, onMount } from "solid-js";
import { useMovies } from "../../context/movieContext";
import { Favorites, Home } from "../../screens";

function BasicRoutes() {
  const [movieData, { addMovie }] = useMovies();
  const [pageId, setPageId] = createSignal(1);
  const [movieResult, { refetch }] = createResource(pageId, fetchMovies);

  async function fetchMovies(pageId) {
    const queryURL =
      import.meta.env.VITE_APP_API_BASE_URL +
      "?api_key=" +
      import.meta.env.VITE_APP_TMDB_API_KEY +
      "&page=" +
      pageId;
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

  onMount(() => {
    getTopRatedMovies();
  });

  return (
    <Show when={!movieResult?.error} fallback={<div>{data.error.message}</div>}>
      <Route path="/" component={<Home />} />
      <Route path="/favorites" component={<Favorites />} />
    </Show>
  );
}

export default BasicRoutes;
