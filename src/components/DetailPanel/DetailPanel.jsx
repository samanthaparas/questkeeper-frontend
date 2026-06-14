function DetailPanel({ selectedResult }) {
  if (!selectedResult) {
    return null; // Don't render anything if no result is selected
  }

  return (
    <section className="detail-panel">
      <h2 className="detail-panel__title">{selectedResult.name}</h2>
      <p className="detail-panel__type">{selectedResult.type}</p>
      <p className="detail-panel__description">{selectedResult.description}</p>
    </section>
  );
}

export default DetailPanel;
