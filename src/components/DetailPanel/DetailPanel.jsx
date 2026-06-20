import "./DetailPanel.css";

function DetailPanel({ selectedResult }) {
  if (!selectedResult) {
    return (
      <section className="detail-panel">
        <h2 className="detail-panel__title">Select a Race</h2>
        <p>Choose a race from the list to view details.</p>
      </section>
    );
  }

  return (
    <section className="detail-panel">
      <h2 className="detail-panel__title">{selectedResult.name}</h2>
      <p className="detail-panel__type">{selectedResult.type}</p>

      <p>
        <strong>Speed:</strong> {selectedResult.speed}
      </p>

      <p>
        <strong>Size:</strong> {selectedResult.size}
      </p>

      <p>
        <strong>Ability Bonuses:</strong> {selectedResult.abilityBonuses}
      </p>

      <p>
        <strong>Alignment</strong>
      </p>

      <p>{selectedResult.alignment}</p>
    </section>
  );
}

export default DetailPanel;
