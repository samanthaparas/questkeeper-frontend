import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getClasses,
  getRaces,
  getSpells,
  getBackgrounds,
} from "../../utils/api";
import SearchForm from "../../components/SearchForm/SearchForm";
import DetailPanel from "../../components/DetailPanel/DetailPanel";
import ResultCard from "../../components/ResultCard/ResultCard";
import "./SearchPage.css";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [allResults, setAllResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [searchQuery, setSearchQuery] = useState(query);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getClasses(), getRaces(), getSpells(), getBackgrounds()])
      .then(([classesData, racesData, spellsData, backgroundsData]) => {
        const formattedClasses = classesData.results.map((item) => ({
          name: item.name,
          category: "Class",
          description: "Select this class to view more details.",
          url: item.url,
        }));

        const formattedRaces = racesData.results.map((item) => ({
          name: item.name,
          category: "Race",
          description: "Select this race to view more details.",
          url: item.url,
        }));

        const formattedSpells = spellsData.results.map((item) => ({
          name: item.name,
          category: "Spell",
          description: "Select this spell to view more details.",
          url: item.url,
        }));

        const formattedBackgrounds = backgroundsData.results.map((item) => ({
          name: item.name,
          category: "Background",
          description: "Select this background to view more details.",
          url: item.url,
        }));

        setAllResults([
          ...formattedClasses,
          ...formattedRaces,
          ...formattedSpells,
          ...formattedBackgrounds,
        ]);
      })
      .catch(() => {
        setApiError("Unable to load search results. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setSearchQuery(query);
    setSelectedResult(null);
  }, [query]);

  const filteredResults = allResults.filter((result) =>
    result.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function handleSearchSubmit(e) {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    setSelectedResult(null);
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  }

  return (
    <main className="search-page">
      <div className="search-page__content">
        <SearchForm
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          onSearchSubmit={handleSearchSubmit}
        />

        <h1 className="search-page__title">Search Results for "{query}"</h1>

        {isLoading && <p className="search-page__status">Loading results...</p>}
        {apiError && <p className="search-page__error">{apiError}</p>}

        <section
          className={`search-page__layout ${
            selectedResult ? "search-page__layout--detail-open" : ""
          }`}
        >
          <div className="search-page__results">
            {!isLoading && !apiError && filteredResults.length === 0 && (
              <p className="search-page__empty">
                No results found. Try another search.
              </p>
            )}

            {filteredResults.map((result) => (
              <ResultCard
                key={`${result.category}-${result.name}`}
                result={result}
                isSelected={selectedResult?.name === result.name}
                onClick={() => setSelectedResult(result)}
              />
            ))}
          </div>

          <div className="search-page__detail-wrapper">
            {selectedResult && (
              <button
                className="search-page__back-button"
                type="button"
                onClick={() => setSelectedResult(null)}
              >
                Back to results
              </button>
            )}

            <DetailPanel selectedResult={selectedResult} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default SearchPage;
