import "./DetailPanel.css";

function DetailPanel({ selectedResult }) {
  if (!selectedResult) {
    return (
      <section className="detail-panel">
        <h2 className="detail-panel__title">Select an Item</h2>
        <p>Choose something from the list to view details.</p>
      </section>
    );
  }

  return (
    <section className="detail-panel">
      <h2 className="detail-panel__title">{selectedResult.name}</h2>
      <p className="detail-panel__type">{selectedResult.category}</p>

      {selectedResult.category === "Race" && (
        <>
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
        </>
      )}

      {selectedResult.category === "Class" && (
        <>
          <p>
            <strong>Hit Die:</strong> {selectedResult.hitDie}
          </p>

          <p>
            <strong>Saving Throws:</strong> {selectedResult.savingThrows}
          </p>

          <p>
            <strong>Proficiencies:</strong>
          </p>

          <ul className="detail-panel__list">
            {selectedResult.proficiencies?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p>
            <strong>Skill Choices:</strong> {selectedResult.skillChoices}
          </p>

          {selectedResult.startingEquipment && (
            <p>
              <strong>Starting Equipment:</strong>{" "}
              {selectedResult.startingEquipment}
            </p>
          )}

          <p>
            <strong>Subclasses:</strong> {selectedResult.subclasses}
          </p>
        </>
      )}
    </section>
  );
}

export default DetailPanel;
