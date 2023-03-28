import { A } from "@solidjs/router";
import tmdbLogo from "../../assets/images/tmdb.svg";

function Footer() {
  return (
    <div className="footer">
      <span>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
        Link to:{" "}
      </span>
      <A href="https://www.themoviedb.org/" target="_blank">
        <img src={tmdbLogo} alt="tmdb" className="tmdb" />
      </A>
    </div>
  );
}

export default Footer;
