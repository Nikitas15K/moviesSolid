function MovieCard(props) {
  return (
    <article className="card">
      <p
        className="heart_animation"
        style={{ opacity: props.num, "font-size": "50px" }}
      >
        🤍
      </p>
      <img
        src={"https://image.tmdb.org/t/p/w500/" + props.movie?.poster_path}
        alt="movie poster"
      />
      <div className="text">
        <h3>
          <b>{props.movie?.title}</b>
        </h3>
        <p className="text">{props.movie?.overview}</p>
      </div>
      <button className="heart" onClick={props.onClick}>
        {props.movie?.isFavorite ? <>💝</> : <>🤍</>}
      </button>
    </article>
  );
}

export default MovieCard;
