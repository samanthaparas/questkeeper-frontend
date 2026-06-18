import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { results } from "../../utils/mockData";
import { useState } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import DetailPanel from "../../components/DetailPanel/DetailPanel";
import ResultCard from "../../components/ResultCard/ResultCard";
import "./SearchPage.css";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const filteredResults = results.filter((result) =>
    result.name.toLowerCase().includes(query.toLowerCase()),
  );

  const [selectedResult, setSelectedResult] = useState(null);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(query || "");

  function handleSearchSubmit(e) {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/search?q=${searchQuery}`);
  }

  return (
    <main className="search-page">
      <SearchForm
        searchQuery={searchQuery}
        setSearchChange={(e) => setSearchQuery(e.target.value)}
        onSearchSubmit={handleSearchSubmit}
      />

      <h1 className="search-page__title">Search Results for "{query}"</h1>

      <section className="search-page__layout">
        <div className="search-page__results">
          {filteredResults.map((result) => (
            <ResultCard
              key={result.name}
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
