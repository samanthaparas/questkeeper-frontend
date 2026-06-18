import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { results } from "../utils/mockData";
import SearchForm from "../components/SearchForm/SearchForm";
import DetailPanel from "../components/DetailPanel/DetailPanel";
import ResultCard from "../components/ResultCard/ResultCard";
import "../pages/SearchPage/SearchPage.css";

function BackgroundsPage() {
  const backgroundResults = results.filter(
    (result) => result.category === "Background",
  );
  const [selectedResult, setSelectedResult] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  function handleSearchSubmit(e) {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/search?q=${searchQuery}`);
  }

  return (
    <main className="search-page">
      <div className="search-page__content">
        <h1 className="search-page__title">Explore Backgrounds</h1>
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
            {backgroundResults.map((result) => (
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

export default BackgroundsPage;
