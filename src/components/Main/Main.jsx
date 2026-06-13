import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./Main.css";
import "../CategoryCard/CategoryCard.css";

const results = [
  { name: "Elf", type: "Race" },
  { name: "Fireball", type: "Spell" },
  { name: "Rogue", type: "Class" },
];

function Main() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResults = results.filter((result) =>
    result.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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

        <SearchForm
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Hides results when search is empty */}
        {searchQuery && (
          <section className="results">
            <h2 className="results__title">Search Results</h2>

            <div className="results__grid">
              {filteredResults.length === 0 ? (
                <p className="results__empty">
                  No results found for "{searchQuery}"
                </p>
              ) : (
                filteredResults.map((result) => (
                  <article className="result-card" key={result.name}>
                    <h3 className="result-card__name">{result.name}</h3>
                    <p className="result-card__type">{result.type}</p>
                  </article>
                ))
              )}
            </div>
          </section>
        )}
      </section>

      <section className="categories">
        <h2 className="categories__title">Explore Categories</h2>
        <div className="categories__grid">
          <CategoryCard
            icon="🛡️"
            title="Races"
            description="Explore unique ancestries and traits"
          />
          <CategoryCard
            icon="⚔️"
            title="Classes"
            description="Discover different character classes and their abilities"
          />
          <CategoryCard
            icon="📖"
            title="Backgrounds"
            description="Choose from a variety of character backgrounds"
          />

          <CategoryCard
            icon="✨"
            title="Spells"
            description="Find and learn about magical spells"
          />
        </div>
      </section>
    </main>
  );
}

export default Main;
