import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class CommuneController {
  static getAllCommunes = (req, res) => {
    try {
      const folderPath = path.join(__dirname, '../../fichas_json');
      const files = fs.readdirSync(folderPath);
      const communes = [];
      files.forEach((file, index) => {
        if (file.endsWith('.json')) {
          const filePath = path.join(folderPath, file);
          const jsonData = fs.readFileSync(filePath, 'utf8');
          const comuna = JSON.parse(jsonData);
          communes.push({
            id: index + 1,
            name: comuna.nombreComuna || 'No disponible',
            province: comuna.provincia || 'No disponible',
            address: comuna.direccion || 'No disponible',
            mayor: comuna.alcalde || 'No disponible',
            surface: comuna.superficie || '0',
            population: comuna.poblacion || 'No Recepcionado'
          });
        }
      });
      return res.status(200).json(communes);
    } catch (error) {
      console.error('Error al obtener comunas:', error);
      return res.status(500).json({ error: 'Error al obtener datos de comunas' });
    }
  }
  
  static getCommuneById = (req, res) => {
    try {
      const { id } = req.params;
      const idNum = parseInt(id);
      const folderPath = path.join(__dirname, '../../fichas_json');
      const files = fs.readdirSync(folderPath);
      const jsonFiles = files.filter(file => file.endsWith('.json'));
      if (idNum <= 0 || idNum > jsonFiles.length) {
        return res.status(404).json({ error: 'Comuna no encontrada' });
      }
      const filePath = path.join(folderPath, jsonFiles[idNum - 1]);
      const jsonData = fs.readFileSync(filePath, 'utf8');
      const comuna = JSON.parse(jsonData);
      const formattedCommune = {
        id: idNum,
        name: comuna.nombreComuna || 'No disponible',
        province: comuna.provincia || 'No disponible',
        address: comuna.direccion || 'No disponible',
        mayor: comuna.alcalde || 'No disponible',
        surface: comuna.superficie || '0',
        population: comuna.poblacion || 'No Recepcionado'
      };
      return res.status(200).json(formattedCommune);
    } catch (error) {
      console.error('Error al obtener comuna:', error);
      return res.status(500).json({ error: 'Error al obtener datos de comuna' });
    }
  }
}