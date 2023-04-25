import { Route, Routes } from "@solidjs/router";
import { createSignal, lazy } from "solid-js";
import { Footer } from "./components";
import { MoviesProvider } from "./context/movieContext";

import { NotFound } from "./screens";

const BasicRoutes = lazy(() => import("./navigations/BasicRoutes/BasicRoutes"));

export const [searchTerm, setSearchTerm] = createSignal("");

function App() {
  return (
    <>
      <MoviesProvider>
        <Routes>
          <BasicRoutes />
          <Route path="/*" element={NotFound} />
        </Routes>
      </MoviesProvider>

      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default App;
