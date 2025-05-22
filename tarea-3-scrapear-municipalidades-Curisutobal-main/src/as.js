// procesarComunas.js
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

// Directorios
const inputDir = './comunas-html';
const outputDir = './comunas-json';

// Crear carpeta de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Función para limpiar texto y evitar errores
const buscarValor = (text, regex) => {
  const match = text.match(regex);
  if (!match || match.length < 2) return null;
  return match[1].trim();
};

// Procesar todos los archivos HTML
const archivos = fs.readdirSync(inputDir).filter(f => f.endsWith('.html'));

for (const archivo of archivos) {
  const html = fs.readFileSync(path.join(inputDir, archivo), 'utf8');
  const $ = cheerio.load(html);
  const texto = $('body').text().replace(/\s+/g, ' ').trim();

  const comuna = {
    nombre: archivo.replace('Comuna-', '').replace('.html', '').replace(/_/g, ' '),
    provincia: buscarValor(texto, /Provincia a la que Pertenece la Comuna:\s*([A-ZÁÉÍÓÚÑ\s]+)/i),
    region: buscarValor(texto, /Región a la que Pertenece la Comuna:\s*([A-ZÁÉÍÓÚÑ\s]+)/i),
    superficie: buscarValor(texto, /Superficie Comunal \(km2\):\s*([\d.,]+)/i),
    poblacion: buscarValor(texto, /Población Comunal, Estimada por el INE.*?No Recepcionado\s*([\d.]+)/i),
    direccion: buscarValor(texto, /Dirección:\s*([^\n]+?250)/i),
    telefono: buscarValor(texto, /Teléfono\s*\(?\d{2,3}\)?\s*([\d\s]+)/i),
    web: buscarValor(texto, /Web:\s*(?:https?:\/\/)?(www\.[\w.-]+\.\w+)/i),
    email: buscarValor(texto, /Email:\s*([\w.-]+@[\w.-]+\.\w+)/i),
    alcalde: buscarValor(texto, /Alcalde\(sa\):?\s*([A-ZÁÉÍÓÚÑ\s]+ [A-ZÁÉÍÓÚÑ\s]+)/i) || 'Nombre no identificado'
  };

  const jsonPath = path.join(outputDir, archivo.replace('.html', '.json'));
  fs.writeFileSync(jsonPath, JSON.stringify(comuna, null, 2), 'utf8');
  console.log(`✅ Comuna procesada: ${comuna.nombre}`);
}

console.log(`\n🏁 Procesamiento completo: ${archivos.length} comunas convertidas a JSON.`);
