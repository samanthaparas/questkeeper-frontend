import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSpells } from "../utils/api";
import SearchForm from "../components/SearchForm/SearchForm";
import DetailPanel from "../components/DetailPanel/DetailPanel";
import ResultCard from "../components/ResultCard/ResultCard";
import "../pages/SearchPage/SearchPage.css";

function SpellsPage() {
  const [spellResults, setSpellResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, SetApiError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    getSpells()
      .then((data) => {
        const formattedClasses = data.results.map((item) => ({
          name: item.name,
          category: "Spell",
          description: "Spell details coming soon.",
          url: item.url,
        }));

        setSpellResults(formattedClasses);
        setSelectedResult(formattedClasses[0]);
      })
      .catch(() => {
        setApiError("Unable to load spells. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleSearchSubmit(e) {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/search?q=${searchQuery}`);
  }

  return (
    <main className="search-page">
      <div className="search-page__content">
        <h1 className="search-page__title">Explore Spells</h1>
        <p className="search-page__description">
          A race represents your character's ancestry and natural traits. Choose
          this first when creating a character.
        </p>

        <SearchForm
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          onSearchSubmit={handleSearchSubmit}
        />

        {isLoading && <p>Loading spells...</p>}
        {apiError && <p>{apiError}</p>}

        <section className="search-page__layout">
          <div className="search-page__results">
            {spellResults.map((result) => (
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

export default SpellsPage;
