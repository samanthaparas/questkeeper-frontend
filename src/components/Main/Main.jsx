import { useState } from "react";
import { results } from "../../utils/mockData";
import SearchForm from "../SearchForm/SearchForm";
import CategoryCard from "../CategoryCard/CategoryCard";
import DetailPanel from "../DetailPanel/DetailPanel";
import ResultCard from "../ResultCard/ResultCard";
import Footer from "../Footer/Footer";
import "./Main.css";

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
                  <ResultCard
                    key={result.name}
                    result={result}
                    onClick={() => setSelectedResult(result)}
                  />
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
      <Footer />
    </main>
  );
}

export default Main;
