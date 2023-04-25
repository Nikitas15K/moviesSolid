import { A } from "@solidjs/router";

function Header(props) {
  let placeholder = `Search ${props.placeholderSearch}`;
  return (
    <header>
      <h2>P3 Movie Page</h2>
      <div>
        <Show
          when={props.placeholderSearch !== "all movies"}
          fallback={
            <>
              <A className="linkTo" href="/favorites">
                Favorites
              </A>
            </>
          }
        >
          <A className="linkTo" href="/">
            Home
          </A>
        </Show>
        <Show
          when={props.placeholderSearch !== "actors"}
          fallback={
            <>
              <A className="linkTo" href="/favorites">
                Favorites
              </A>
            </>
          }
        >
          <A className="linkTo" href="/actor">
            Actors
          </A>
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
