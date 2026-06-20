import { useState } from "react";
import { results } from "../utils/mockData";
import SearchForm from "../components/SearchForm/SearchForm";
import DetailPanel from "../components/DetailPanel/DetailPanel";
import ResultCard from "../components/ResultCard/ResultCard";
import "../pages/SearchPage/SearchPage.css";

function RacesPage() {
  const raceResults = results.filter((result) => result.category === "Race");
  const [selectedResult, setSelectedResult] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRaces = raceResults.filter((result) =>
    result.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function handleSearchSubmit(e) {
    e.preventDefault();
  }

  return (
    <main className="search-page">
      <div className="search-page__content">
        <h1 className="search-page__title">Explore Races</h1>

        <p className="search-page__description">
          A race represents your character's ancestry and natural traits. Choose
          this first when creating a character.
        </p>

        <SearchForm
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          onSearchSubmit={handleSearchSubmit}
        />

        <section className="search-page__layout">
          <div className="search-page__results">
            {filteredRaces.map((result) => (
              <ResultCard
                key={result.name}
                result={result}
                onClick={() => setSelectedResult(result)}
              />
            ))}
          </div>

          <DetailPanel selectedResult={selectedResult} />
        </section>
      </div>
    </main>
  );
}

export default RacesPage;
