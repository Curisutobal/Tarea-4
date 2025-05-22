import { useEffect, useState } from "react";

export function Commune() {
  const [comunas, setComunas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/commune/all")
      .then(res => {
        if (!res.ok) throw new Error("No se pudieron cargar los datos de comunas.");
        return res.json();
      })
      .then(setComunas)
      .catch(err => setError(err.message));
  }, []);

  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", color: "white" }}>
      {comunas.map((comuna, i) => (
        <div key={i} style={{ marginBottom: 24, borderBottom: "1px solid #ccc", paddingBottom: 12 }}>
          <div>nombreComuna: {comuna.nombreComuna}</div>
          <div>provincia: {comuna.provincia}</div>
          <div>direccion: {comuna.direccion}</div>
          <div>alcalde: {comuna.alcalde}</div>
          <div>superficie: {comuna.superficie}</div>
          <div>poblacion: {comuna.poblacion}</div>
        </div>
      ))}
    </div>
  );
}