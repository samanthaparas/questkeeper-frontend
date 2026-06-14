import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./Main.css";
import "../CategoryCard/CategoryCard.css";
import DetailPanel from "../DetailPanel/DetailPanel";

const results = [
  {
    name: "Elf",
    type: "Race",
    description: "Graceful humanoids with keen senses and magical ancestry.",
  },
  {
    name: "Fireball",
    type: "Spell",
    description: "A bright streak flashes into an explosion of flame.",
  },
  {
    name: "Rogue",
    type: "Class",
    description: "A skilled adventurer who relies on stealth and precision.",
  },
];

function Main() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);

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
          onSearchChange={(e) => {
            setSearchQuery(e.target.value);
            setSelectedResult(null);
          }}
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
                  <article
                    className="result-card"
                    key={result.name}
                    onClick={() => setSelectedResult(result)}
                  >
                    <h3 className="result-card__name">{result.name}</h3>
                    <p className="result-card__type">{result.type}</p>
                  </article>
                ))
              )}
            </div>
          </section>
        )}
        <DetailPanel selectedResult={selectedResult} />
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
