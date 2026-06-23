import { useEffect, useState } from "react";
import { getRaces, getResourceDetails } from "../utils/api";
import SearchForm from "../components/SearchForm/SearchForm";
import DetailPanel from "../components/DetailPanel/DetailPanel";
import ResultCard from "../components/ResultCard/ResultCard";
import "../pages/SearchPage/SearchPage.css";

function RacesPage() {
  const [raceResults, setRaceResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    setIsLoading(true);

    getRaces()
      .then((data) => {
        const formattedRaces = data.results.map((item) => ({
          name: item.name,
          category: "Race",
          description: "Select this race to view more details.",
          url: item.url,
        }));

        setRaceResults(formattedRaces);
      })
      .catch(() => {
        setApiError("Unable to load races. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredRaces = raceResults.filter((result) =>
    result.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    if (searchQuery && filteredRaces.length === 0) {
      setSelectedResult(null);
    }
  }, [searchQuery, filteredRaces]);

  function handleSearchSubmit(e) {
    e.preventDefault();
  }

  function handleResultClick(result) {
    setSelectedResult(result);

    getResourceDetails(result.url)
      .then((data) => {
        console.log(data);

        const abilityBonuses = data.ability_bonuses
          .map((ability) => `${ability.ability_score.name} +${ability.bonus}`)
          .join(", ");

        const formattedRace = {
          name: data.name,
          category: "Race",
          speed: data.speed,
          size: data.size,
          alignment: data.alignment,
          abilityBonuses,
        };

        setSelectedResult(formattedRace);
        setApiError("");
      })
      .catch(() => {
        setApiError("Unable to load race details. Please try again later.");
      });
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

        {isLoading && <p>Loading races...</p>}
        {apiError && <p>{apiError}</p>}

        <section className="search-page__layout">
          <div className="search-page__results">
            {filteredRaces.length === 0 && (
              <p className="search-page__empty">
                No races found. Try another search.
              </p>
            )}

            {filteredRaces.map((result) => (
              <ResultCard
                key={result.name}
                result={result}
                isSelected={selectedResult?.name === result.name}
                onClick={() => handleResultClick(result)}
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
