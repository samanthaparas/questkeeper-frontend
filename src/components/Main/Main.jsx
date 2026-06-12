import SearchForm from "../SearchForm/SearchForm";
import "./Main.css";

function Main() {
  return (
    <main className="main">
      <section className="hero">
        <h1>
          Everything D&D.
          <br />
          All in One Place.
        </h1>

        <p>
          Search races, classes, spells, backgrounds, and more.
          <br />
          No more opening a dozen tabs.
        </p>

        <SearchForm />
      </section>
    </main>
  );
}

export default Main;
