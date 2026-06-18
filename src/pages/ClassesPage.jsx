import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClasses } from "../utils/api";
import SearchForm from "../components/SearchForm/SearchForm";
import DetailPanel from "../components/DetailPanel/DetailPanel";
import ResultCard from "../components/ResultCard/ResultCard";
import "../pages/SearchPage/SearchPage.css";

function ClassesPage() {
  const [classResults, setClassResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    getClasses()
      .then((data) => {
        const formattedClasses = data.results.map((item) => ({
          name: item.name,
          category: "Class",
          description: "Class details coming soon.",
          url: item.url,
        }));

        setClassResults(formattedClasses);
        setSelectedResult(formattedClasses[0]);
      })
      .catch(() => {
        setApiError("Unable to load classes. Please try again later.");
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
        <h1 className="search-page__title">Explore Classes</h1>

        <p className="search-page__description">
          A class represents what your character does best, like casting spells,
          fighting, healing, sneaking, or protecting the party.
        </p>

        <SearchForm
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          onSearchSubmit={handleSearchSubmit}
        />

        {isLoading && <p>Loading classes...</p>}
        {apiError && <p>{apiError}</p>}

        <section className="search-page__layout">
          <div className="search-page__results">
            {classResults.map((result) => (
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

export default ClassesPage;
