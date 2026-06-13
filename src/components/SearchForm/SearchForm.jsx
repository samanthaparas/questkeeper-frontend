import "./SearchForm.css";

function SearchForm({ searchQuery, onSearchChange }) {
  return (
    <form className="search-form">
      <input
        className="search-form__input"
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search everything... (e.g., Fireball, Elf, Rogue)"
      />
    </form>
  );
}

export default SearchForm;

//  icon="🔍"
