import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search-form">
      <input
        className="search-form__input"
        type="text"
        placeholder="Search everything... (e.g., Fireball, Elf, Rogue)"
      />
    </section>
  );
}

export default SearchForm;
