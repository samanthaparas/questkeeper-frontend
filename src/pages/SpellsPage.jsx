import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSpells, getResourceDetails } from "../utils/api";
import SearchForm from "../components/SearchForm/SearchForm";
import DetailPanel from "../components/DetailPanel/DetailPanel";
import ResultCard from "../components/ResultCard/ResultCard";
import "../pages/SearchPage/SearchPage.css";

function SpellsPage() {
  const [spellResults, setSpellResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getSpells()
      .then((data) => {
        const formattedSpells = data.results.map((item) => ({
          name: item.name,
          category: "Spell",
          description: "Select this spell to view more details.",
          url: item.url,
        }));

        setSpellResults(formattedSpells);
      })
      .catch(() => {
        setApiError("Unable to load spells. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredSpells = spellResults.filter((result) =>
    result.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function handleSearchSubmit(e) {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  }

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
    setSelectedResult(null);
  }

  function handleResultClick(result) {
    setSelectedResult(result);

    getResourceDetails(result.url)
      .then((data) => {
        const formattedSpell = {
          name: data.name,
          category: "Spell",
          description: data.desc?.[0] || "No description available.",
          range: data.range,
          duration: data.duration,
          castingTime: data.casting_time,
          level: data.level,
        };

        setSelectedResult(formattedSpell);
        setApiError("");
      })
      .catch(() => {
        setApiError("Unable to load spell details. Please try again.");
      });
  }

  return (
    <main className="search-page">
      <div className="search-page__content">
        <h1 className="search-page__title">Explore Spells</h1>

        <p className="search-page__description">
          Spells define the magical effects your character can cast in and out
          of combat.
        </p>

        <SearchForm
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />

        {isLoading && <p className="search-page__status">Loading spells...</p>}
        {apiError && <p className="search-page__error">{apiError}</p>}

        <section
          className={`search-page__layout ${
            selectedResult ? "search-page__layout--detail-open" : ""
          }`}
        >
          <div className="search-page__results">
            {!isLoading && filteredSpells.length === 0 && (
              <p className="search-page__empty">
                No spells found. Try another search.
              </p>
            )}

            {filteredSpells.map((result) => (
              <ResultCard
                key={result.name}
                result={result}
                isSelected={selectedResult?.name === result.name}
                onClick={() => handleResultClick(result)}
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

export default SpellsPage;
