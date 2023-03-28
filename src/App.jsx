import { Route, Routes } from "@solidjs/router";
import { createSignal, lazy } from "solid-js";
import { Footer } from "./components";
import { MoviesProvider } from "./context/movieContext";
import { getFavoriteMoviesFromLocalStorage } from "./helpers/helpers";
import myMovies from "./plain_data.json";
import { NotFound } from "./screens";

const BasicRoutes = lazy(() => import("./navigations/BasicRoutes/BasicRoutes"));

export const [searchTerm, setSearchTerm] = createSignal("");

function App() {
  myMovies.map((movie) => {
    if (getFavoriteMoviesFromLocalStorage().includes(movie?.id)) {
      movie.isFavorite = true;
    }
  });
  return (
    <>
      <MoviesProvider movieData={myMovies}>
        <Routes>
          <BasicRoutes />
        </Routes>
      </MoviesProvider>
      <Routes>
        <Route path="*" component={NotFound} />
      </Routes>

      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default App;
