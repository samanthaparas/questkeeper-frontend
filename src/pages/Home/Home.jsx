import { useState } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import Footer from "../../components/Footer/Footer";
import "../../components/Main/Main.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

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
          <section className="search-experience">
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

            <DetailPanel selectedResult={selectedResult} />
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
      <Footer />
    </main>
  );
}

export default Home;
