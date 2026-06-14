import "./ResultCard.css";

function ResultCard({ result, onClick }) {
  return (
    <article className="result-card" onClick={onClick}>
      <h3 className="result-card__name">{result.name}</h3>
      <p className="result-card__type">{result.type}</p>
    </article>
  );
}

export default ResultCard;
