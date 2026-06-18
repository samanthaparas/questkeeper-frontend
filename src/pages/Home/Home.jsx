import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import Footer from "../../components/Footer/Footer";
import "../../components/Main/Main.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  function handleSearchSubmit(e) {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/search?q=${searchQuery}`);
  }

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
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          onSearchSubmit={handleSearchSubmit}
        />
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
