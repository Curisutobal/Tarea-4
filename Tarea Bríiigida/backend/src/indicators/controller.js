import fs from "fs/promises";
import path from "path";

const INDICATORS_FOLDER = path.resolve(process.cwd(), "../Indicadores_json");

const indicatorFieldMap = {
  "poblacion_femenina": "poblacionComunalFemenina",
  "poblacion_masculina": "porcentajePoblacionComunalMasculina",
  "ingresos_fondo_comun_municipal": "ingresosFondoComunMunicipal",
  "ingresos_propios": "ingresosPropios",
  "consumo_agua": "consumoAgua",
  "gastos_salud": "gastosSalud",
  "ingresos_salud": "ingresosSalud"
};

export class Controller {
  async getAllIndicators(req, res) {
  const indicatorsList = [
    { key: "poblacion_femenina", nombre: "% Población comunal femenina" },
    { key: "poblacion_masculina", nombre: "% Población comunal masculina" },
    { key: "ingresos_fondo_comun_municipal", nombre: "Ingresos por Fondo Común Municipal" },
    { key: "ingresos_propios", nombre: "Ingresos Propios" },
    { key: "consumo_agua", nombre: "Consumo de Agua" },
    { key: "gastos_salud", nombre: "Gastos Salud" },
    { key: "ingresos_salud", nombre: "Ingresos Salud" }
  ];
  res.json(indicatorsList);
}

  async getIndicatorById(req, res) {
    const { id } = req.params;
    const field = indicatorFieldMap[id];
    if (!field) return res.status(404).json({ error: "Indicador no válido" });

    console.log("Buscando archivos en:", INDICATORS_FOLDER);

    try {
      const files = await fs.readdir(INDICATORS_FOLDER);
      console.log("Archivos encontrados:", files.slice(0, 5), "..."); 

      const results = [];
      for (const file of files) {
        if (file.endsWith(".json")) {
          const fullPath = path.join(INDICATORS_FOLDER, file);
          try {
            const content = await fs.readFile(fullPath, "utf-8");
            const data = JSON.parse(content);

            results.push({
              nombreComuna: data.nombreComuna,
              valor: data[field]
            });
          } catch (e) {
            console.error("Error leyendo/parsing archivo:", file, e.message);
          }
        }
      }
      res.json(results);
    } catch (e) {
      console.error("ERROR EN BACKEND:", e.message, e);
      res.status(500).json({ error: "Error al leer los archivos de indicadores" });
    }
  }
}

