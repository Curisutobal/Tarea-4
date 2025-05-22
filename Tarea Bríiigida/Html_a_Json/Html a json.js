import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const fichasHtmlDir = path.join(rootDir, "fichas_html");
const fichasJsonDir = path.join(rootDir, "fichas_json");
const indicadoresJsonDir = path.join(rootDir, "Indicadores_json");

async function checkFichasHtmlDir() {
  try {
    const stat = await fs.stat(fichasHtmlDir);
    if (!stat.isDirectory()) throw new Error();
  } catch {
    console.error(`
ERROR: No se encontró la carpeta 'fichas_html' en la raíz del proyecto.
Asegúrate de que la carpeta exista y tenga exactamente este nombre.
`);
    process.exit(1);
  }
}

async function ensureDirExists(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
}

function getTdValueByLabel($, label) {
  let val = null;
  $(".cont_info table tr").each((_, tr) => {
    const tds = $(tr).find("td");
    if (
      tds.length === 2 &&
      $(tds[0]).text().replace(/\s+/g, " ").trim().toLowerCase().includes(label.toLowerCase())
    ) {
      val = $(tds[1]).text().replace(/\s+/g, " ").trim();
    }
  });
  return val;
}

function getAlcalde($) {
  let alcalde = null;
  $("h3").each((_, el) => {
    if ($(el).text().trim().toLowerCase().startsWith("autoridades")) {
      let table = $(el).nextAll("table").first();
      let h3 = table.find("td").eq(1).find("h3").first();
      alcalde = h3.text().replace(/\s+/g, " ").trim();
    }
  });
  return alcalde;
}

function getSuperficie($) {
  let superficie = null;
  $("table").each((_, table) => {
    if ($(table).find("th").first().text().includes("Información geográfica")) {
      $(table)
        .find("tr")
        .each((_, tr) => {
          const tds = $(tr).find("td");
          if (
            tds.length === 3 &&
            $(tds[0]).text().replace(/\s+/g, " ").trim() === "Superficie Comunal (km2)"
          ) {
            superficie = $(tds[2]).text().replace(/\s+/g, " ").trim();
          }
        });
    }
  });
  return superficie;
}

function getPoblacion($) {
  let poblacion = null;
  $("h3").each((_, el) => {
    if ($(el).text().trim().toLowerCase().startsWith("salud municipal")) {
      let table = $(el).nextAll("table").first();
      table.find("tr").each((_, tr) => {
        const tds = $(tr).find("td");
        if (
          tds.length >= 3 &&
          $(tds[0]).text().replace(/\s+/g, " ").trim() === "¿Administra o No Administra Sistema de Salud Municipal?"
        ) {
          poblacion = $(tds[2]).text().replace(/\s+/g, " ").trim();
        }
      });
    }
  });
  return poblacion;
}

function getIndicador($, h3Text, rowLabel) {
  let val = null;
  $("h3").each((_, el) => {
    if ($(el).text().trim().toLowerCase().includes(h3Text.toLowerCase())) {
      let table = $(el).nextAll("table").first();
      table.find("tr").each((_, tr) => {
        const tds = $(tr).find("td");
        if (
          tds.length >= 3 &&
          $(tds[0]).text().replace(/\s+/g, " ").trim().toLowerCase() ===
            rowLabel.toLowerCase()
        ) {
          val = $(tds[2]).text().replace(/\s+/g, " ").trim();
        }
      });
    }
  });
  return val;
}

async function scrapeFichasHtml() {
  await ensureDirExists(fichasJsonDir);
  const files = await fs.readdir(fichasHtmlDir);
  for (const file of files) {
    if (!file.endsWith(".html")) continue;
    const htmlPath = path.join(fichasHtmlDir, file);
    const jsonPath = path.join(fichasJsonDir, file.replace(".html", ".json"));
    const html = await fs.readFile(htmlPath, "utf8");
    const $ = cheerio.load(html);

    const data = {
      nombreComuna: $("h1").first().text().replace(/\s+/g, " ").trim().toUpperCase() || file.replace(".html", ""),
      provincia: getTdValueByLabel($, "Provincia:"),
      direccion: getTdValueByLabel($, "Dirección:"),
      alcalde: getAlcalde($),
      superficie: getSuperficie($) ?? "",
      poblacion: getPoblacion($)
    };

    await fs.writeFile(jsonPath, JSON.stringify(data, null, 2));
    console.log(`✔ Ficha procesada: ${jsonPath}`);
  }
}

async function scrapeIndicadoresHtml() {
  await ensureDirExists(indicadoresJsonDir);
  const files = await fs.readdir(fichasHtmlDir);
  for (const file of files) {
    if (!file.endsWith(".html")) continue;
    const htmlPath = path.join(fichasHtmlDir, file);
    const jsonPath = path.join(indicadoresJsonDir, file.replace(".html", ".json"));
    const html = await fs.readFile(htmlPath, "utf8");
    const $ = cheerio.load(html);

    const data = {
      nombreComuna: $("h1").first().text().replace(/\s+/g, " ").trim().toUpperCase() || file.replace(".html", ""),
      poblacionComunalFemenina: getIndicador($, "Población Comunal", "Porcentaje de Población Comunal Femenina"),
      porcentajePoblacionComunalMasculina: getIndicador($, "Población Comunal", "Porcentaje de Población Comunal Masculina"),
      ingresosFondoComunMunicipal: getIndicador($, "Ingresos Municipales", "Ingresos por Fondo Común Municipal"),
      ingresosPropios: getIndicador($, "Ingresos Municipales", "Ingresos Propios Permanentes (IPP)"),
      consumoAgua: getIndicador($, "Gastos Municipales", "Consumo de Agua"),
      gastosSalud: getIndicador($, "Salud Municipal", "Gastos Salud (Gasto Total Devengado)"),
      ingresosSalud: getIndicador($, "Salud Municipal", "Ingresos Salud (Ingreso Total Percibido)")
    };

    await fs.writeFile(jsonPath, JSON.stringify(data, null, 2));
    console.log(`✔ Indicador procesado: ${jsonPath}`);
  }
}

async function main() {
  await checkFichasHtmlDir();
  console.log("Procesando fichas_html → fichas_json...");
  await scrapeFichasHtml();
  console.log("Procesando fichas_html → Indicadores_json...");
  await scrapeIndicadoresHtml();
  console.log("Listo.");
}

main().catch(err => {
  console.error("ERROR:", err);
  process.exit(1);
});