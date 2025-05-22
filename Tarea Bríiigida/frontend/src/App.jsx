import React, { useState, useEffect } from "react";
import Indicators from "./indicators/Indicators.jsx";
import { Commune } from "./communes/Commune";

function App() {
  const [view, setView] = useState("comunas");
  const [indicators, setIndicators] = useState([]);
  const [selected, setSelected] = useState(null);
  const [communeData, setCommuneData] = useState([]);


  useEffect(() => {
    if (view === "indicadores") {
      fetch("http://localhost:3000/indicators/")
        .then(res => res.json())
        .then(data => setIndicators(data))
        .catch(() => setIndicators([]));
    }

    if (view !== "indicadores") {
      setSelected(null);
      setCommuneData([]);
    }
  }, [view]);


  useEffect(() => {
    if (selected) {
      fetch(`http://localhost:3000/indicators/${selected}`)
        .then(res => res.json())
        .then(data => setCommuneData(data))
        .catch(() => setCommuneData([]));
    }
  }, [selected]);

  return (
    <div>
      <div className="menu">
        <button
          className="nav-btn"
          onClick={() => setView("comunas")}
          style={{ fontWeight: view === "comunas" ? "bold" : "normal" }}>
          Comunas
        </button>
        <button
          className="nav-btn"
          onClick={() => setView("indicadores")}
          style={{ fontWeight: view === "indicadores" ? "bold" : "normal" }}>
          Indicadores
        </button>
      </div>
      {view === "comunas" && (
        <Commune />
      )}
      {view === "indicadores" && (
        <Indicators
          indicators={indicators}
          selected={selected}
          setSelected={setSelected}
          communeData={communeData}
        />
      )}
    </div>
  );
}

export default App;