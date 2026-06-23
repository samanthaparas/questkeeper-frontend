import "./ResultCard.css";

function ResultCard({ result, onClick, isSelected }) {
  return (
    <article
      className={`result-card ${isSelected ? "result-card--selected" : ""}`}
      onClick={onClick}
    >
      <h3 className="result-card__name">{result.name}</h3>
      <p className="result-card__type">{result.category}</p>
    </article>
  );
}

export default ResultCard;
