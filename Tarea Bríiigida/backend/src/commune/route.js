import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get("/all", async (req, res) => {
  try {
    const fichasDir = path.resolve(__dirname, "../../../fichas_json");
    console.log("Buscando en carpeta:", fichasDir);
    const files = fs.readdirSync(fichasDir).filter(f => f.endsWith(".json"));
    let comunas = [];
    for (const file of files) {
      const filePath = path.join(fichasDir, file);
      try {
        const content = fs.readFileSync(filePath, "utf-8");
        const json = JSON.parse(content);
        if (!json.nombreComuna) {
          console.warn(`Archivo sin nombreComuna: ${file}`);
        }
        comunas.push(json);
      } catch (e) {
        console.error(`Error leyendo o parseando ${file}:`, e);
      }
    }
    
    comunas = comunas.filter(c => c && typeof c.nombreComuna === "string");
    comunas.sort((a, b) => a.nombreComuna.localeCompare(b.nombreComuna, "es"));
    res.json(comunas);
  } catch (error) {
    console.error("ERROR AL LEER FICHAS:", error);
    res.status(500).json({ error: "No se pudieron cargar las comunas" });
  }
});

export const CommuneRoute = { route: router };