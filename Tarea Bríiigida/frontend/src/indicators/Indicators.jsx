import React from "react";

function Indicators({ indicators = [], selected, setSelected, communeData = [] }) {
  return (
    <div>
      <div>
        {indicators.map(ind => (
          <button
            className="indicator-btn"
            key={ind.key}
            onClick={() => setSelected(ind.key)}
            style={{
              fontWeight: selected === ind.key ? "bold" : "normal",
              borderBottom: selected === ind.key ? "2px solid blue" : "none"
            }}
          >
            {ind.nombre}
          </button>
        ))}
      </div>
      <div style={{ marginTop: "2rem" }}>
        {Array.isArray(communeData) && communeData.length > 0 ? (
          communeData.map(comuna => (
            <div key={comuna.nombreComuna}>
              {comuna.nombreComuna} - {comuna.valor}
            </div>
          ))
        ) : selected ? (
          <div>No hay datos para este indicador.</div>
        ) : (
          <div>Selecciona un indicador para ver los datos.</div>
        )}
      </div>
    </div>
  );
}

export default Indicators;