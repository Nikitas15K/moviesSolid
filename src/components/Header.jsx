function Header(props) {
  let placeholder = `Search ${props.placeholderSearch}`;
  return (
    <header>
      <h1>P3 Movie Page</h1>
      <div>
        <Show
          when={props.placeholderSearch !== "all movies"}
          fallback={
            <button className="linkTo" onClick={props.onClick}>
              Favorites
            </button>
          }
        >
          <button className="linkTo" onClick={props.onClick}>
            Home
          </button>
        </Show>

        <input
          placeholder={placeholder}
          onInput={props.onInput}
          value={props.searchTerm}
        />
      </div>
    </header>
  );
}

export default Header;
