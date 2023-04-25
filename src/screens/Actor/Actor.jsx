import { useNavigate } from "@solidjs/router";
import { searchTerm, setSearchTerm } from "../../App";
import { Header } from "../../components";

function Actor() {
  const navigate = useNavigate();
  // const [actors] = useMovies();
  // const [actorData, { addMovie }] = movies;
  return (
    <>
      <Header
        placeholderSearch="actors"
        searchTerm={searchTerm()}
        onInput={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <div className="comingSoon">
        <p> A page with actors will be available soon</p>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </button>
      </div>
    </>
  );
}

export default Actor;
