import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getClasses, getRaces } from "../../utils/api";
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

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getClasses(), getRaces()]).then(([classesData, racesData]) => {
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

      setAllResults([...formattedClasses, ...formattedRaces]);
    });
  }, []);

  useEffect(() => {
    setSearchQuery(query);
    setSelectedResult(null);
  }, [query]);

  const filteredResults = allResults.filter((result) =>
    result.name.toLowerCase().includes(query.toLowerCase()),
  );

  function handleSearchSubmit(e) {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/search?q=${searchQuery}`);
  }

  return (
    <main className="search-page">
      <SearchForm
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onSearchSubmit={handleSearchSubmit}
      />

      <h1 className="search-page__title">Search Results for "{query}"</h1>

      <section className="search-page__layout">
        <div className="search-page__results">
          {filteredResults.length === 0 && (
            <p>No results found. Try another search.</p>
          )}

          {filteredResults.map((result) => (
            <ResultCard
              key={`${result.category}-${result.name}`}
              result={result}
              onClick={() => setSelectedResult(result)}
            />
          ))}
        </div>

        <DetailPanel selectedResult={selectedResult} />
      </section>
    </main>
  );
}

export default SearchPage;
