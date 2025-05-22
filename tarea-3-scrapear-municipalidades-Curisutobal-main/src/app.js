// app.js - Versión ES Modules
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio actual (para módulos ES)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lista de comunas con sus códigos
const comunas = [
  { codigo: "05602", nombre: "ALGARROBO" },
  { codigo: "13502", nombre: "ALHUÉ" },
  { codigo: "08314", nombre: "ALTO_BIOBÍO" },
  { codigo: "03302", nombre: "ALTO_DEL_CARMEN" },
  { codigo: "01107", nombre: "ALTO_HOSPICIO" },
  { codigo: "10202", nombre: "ANCUD" },
  { codigo: "04103", nombre: "ANDACOLLO" },
  { codigo: "09201", nombre: "ANGOL" },
  { codigo: "02101", nombre: "ANTOFAGASTA" },
  { codigo: "08302", nombre: "ANTUCO" },
  { codigo: "08202", nombre: "ARAUCO" },
  { codigo: "15101", nombre: "ARICA" },
  { codigo: "11201", nombre: "AYSÉN" },
  { codigo: "13402", nombre: "BUIN" },
  { codigo: "16102", nombre: "BULNES" },
  { codigo: "05402", nombre: "CABILDO" },
  { codigo: "12201", nombre: "CABO_DE_HORNOS" },
  { codigo: "08303", nombre: "CABRERO" },
  { codigo: "08203", nombre: "CAÑETE" },
  { codigo: "02201", nombre: "CALAMA" },
  { codigo: "10102", nombre: "CALBUCO" },
  { codigo: "03102", nombre: "CALDERA" },
  { codigo: "05502", nombre: "CALERA" },
  { codigo: "13403", nombre: "CALERA_DE_TANGO" },
  { codigo: "05302", nombre: "CALLE_LARGA" },
  { codigo: "15102", nombre: "CAMARONES" },
  { codigo: "01402", nombre: "CAMIÑA" },
  { codigo: "04202", nombre: "CANELA" },
  { codigo: "09102", nombre: "CARAHUE" },
  { codigo: "05603", nombre: "CARTAGENA" },
  { codigo: "05102", nombre: "CASABLANCA" },
  { codigo: "10201", nombre: "CASTRO" },
  { codigo: "05702", nombre: "CATEMU" },
  { codigo: "07201", nombre: "CAUQUENES" },
  { codigo: "13102", nombre: "CERRILLOS" },
  { codigo: "13103", nombre: "CERRO_NAVIA" },
  { codigo: "03201", nombre: "CHAÑARAL" },
  { codigo: "10401", nombre: "CHAITÉN" },
  { codigo: "07202", nombre: "CHANCO" },
  { codigo: "08103", nombre: "CHIGUAYANTE" },
  { codigo: "11401", nombre: "CHILE_CHICO" },
  { codigo: "16101", nombre: "CHILLÁN" },
  { codigo: "16103", nombre: "CHILLÁN_VIEJO" },
  { codigo: "06303", nombre: "CHIMBARONGO" },
  { codigo: "09121", nombre: "CHOLCHOL" },
  { codigo: "10203", nombre: "CHONCHI" },
  { codigo: "06302", nombre: "CHÉPICA" },
  { codigo: "11202", nombre: "CISNES" },
  { codigo: "16202", nombre: "COBQUECURA" },
  { codigo: "10103", nombre: "COCHAMÓ" },
  { codigo: "11301", nombre: "COCHRANE" },
  { codigo: "06102", nombre: "CODEGUA" },
  { codigo: "16203", nombre: "COELEMU" },
  { codigo: "16302", nombre: "COIHUECO" },
  { codigo: "06103", nombre: "COINCO" },
  { codigo: "07402", nombre: "COLBÚN" },
  { codigo: "01403", nombre: "COLCHANE" },
  { codigo: "13301", nombre: "COLINA" },
  { codigo: "09202", nombre: "COLLIPULLI" },
  { codigo: "06104", nombre: "COLTAUCO" },
  { codigo: "04302", nombre: "COMBARBALÁ" },
  { codigo: "08101", nombre: "CONCEPCIÓN" },
  { codigo: "13104", nombre: "CONCHALÍ" },
  { codigo: "05103", nombre: "CONCÓN" },
  { codigo: "07102", nombre: "CONSTITUCIÓN" },
  { codigo: "08204", nombre: "CONTULMO" },
  { codigo: "03101", nombre: "COPIAPÓ" },
  { codigo: "04102", nombre: "COQUIMBO" },
  { codigo: "08102", nombre: "CORONEL" },
  { codigo: "11101", nombre: "COYHAIQUE" },
  { codigo: "09103", nombre: "CUNCO" },
  { codigo: "09203", nombre: "CURACAUTÍN" },
  { codigo: "13503", nombre: "CURACAVÍ" },
  { codigo: "10204", nombre: "CURACO_DE_VÉLEZ" },
  { codigo: "08205", nombre: "CURANILAHUE" },
  { codigo: "09104", nombre: "CURARREHUE" },
  { codigo: "07103", nombre: "CUREPTO" },
  { codigo: "07301", nombre: "CURICÓ" },
  { codigo: "10205", nombre: "DALCAHUE" },
  { codigo: "03202", nombre: "DIEGO_DE_ALMAGRO" },
  { codigo: "06105", nombre: "DOÑIHUE" },
  { codigo: "13105", nombre: "EL_BOSQUE" },
  { codigo: "16104", nombre: "EL_CARMEN" },
  { codigo: "13602", nombre: "EL_MONTE" },
  { codigo: "05604", nombre: "EL_QUISCO" },
  { codigo: "05605", nombre: "EL_TABO" },
  { codigo: "07104", nombre: "EMPEDRADO" },
  { codigo: "09204", nombre: "ERCILLA" },
  { codigo: "13106", nombre: "ESTACIÓN_CENTRAL" },
  { codigo: "08104", nombre: "FLORIDA" },
  { codigo: "09105", nombre: "FREIRE" },
  { codigo: "03303", nombre: "FREIRINA" },
  { codigo: "10104", nombre: "FRESIA" },
  { codigo: "10402", nombre: "FUTALEUFÚ" },
  { codigo: "14202", nombre: "FUTRONO" },
  { codigo: "09106", nombre: "GALVARINO" },
  { codigo: "15202", nombre: "GENERAL_LAGOS" },
  { codigo: "09107", nombre: "GORBEA" },
  { codigo: "06106", nombre: "GRANEROS" },
  { codigo: "11203", nombre: "GUAITECAS" },
  { codigo: "05503", nombre: "HIJUELAS" },
  { codigo: "07302", nombre: "HUALAÑÉ" },
  { codigo: "10403", nombre: "HUALAIHUÉ" },
  { codigo: "08112", nombre: "HUALPÉN" },
  { codigo: "08105", nombre: "HUALQUI" },
  { codigo: "01404", nombre: "HUARA" },
  { codigo: "03304", nombre: "HUASCO" },
  { codigo: "13107", nombre: "HUECHURABA" },
  { codigo: "04201", nombre: "ILLAPEL" },
  { codigo: "13108", nombre: "INDEPENDENCIA" },
  { codigo: "01101", nombre: "IQUIQUE" },
  { codigo: "16303", nombre: "ÑIQUÉN" },
  { codigo: "13603", nombre: "ISLA_DE_MAIPO" },
  { codigo: "05201", nombre: "ISLA_DE_PASCUA" },
  { codigo: "05104", nombre: "JUAN_FERNÁNDEZ" },
  { codigo: "13109", nombre: "LA_CISTERNA" },
  { codigo: "05504", nombre: "LA_CRUZ" },
  { codigo: "06202", nombre: "LA_ESTRELLA" },
  { codigo: "13110", nombre: "LA_FLORIDA" },
  { codigo: "14203", nombre: "LAGO_RANCO" },
  { codigo: "11102", nombre: "LAGO_VERDE" },
  { codigo: "13111", nombre: "LA_GRANJA" },
  { codigo: "12102", nombre: "LAGUNA_BLANCA" },
  { codigo: "04104", nombre: "LA_HIGUERA" },
  { codigo: "08304", nombre: "LAJA" },
  { codigo: "05401", nombre: "LA_LIGUA" },
  { codigo: "13302", nombre: "LAMPA" },
  { codigo: "14103", nombre: "LANCO" },
  { codigo: "13112", nombre: "LA_PINTANA" },
  { codigo: "13113", nombre: "LA_REINA" },
  { codigo: "06107", nombre: "LAS_CABRAS" },
  { codigo: "13114", nombre: "LAS_CONDES" },
  { codigo: "04101", nombre: "LA_SERENA" },
  { codigo: "14201", nombre: "LA_UNIÓN" },
  { codigo: "09108", nombre: "LAUTARO" },
  { codigo: "08201", nombre: "LEBU" },
  { codigo: "07303", nombre: "LICANTÉN" },
  { codigo: "05802", nombre: "LIMACHE" },
  { codigo: "07401", nombre: "LINARES" },
  { codigo: "06203", nombre: "LITUECHE" },
  { codigo: "05703", nombre: "LLAILLAY" },
  { codigo: "10107", nombre: "LLANQUIHUE" },
  { codigo: "13115", nombre: "LO_BARNECHEA" },
  { codigo: "13116", nombre: "LO_ESPEJO" },
  { codigo: "06304", nombre: "LOLOL" },
  { codigo: "09109", nombre: "LONCOCHE" },
  { codigo: "07403", nombre: "LONGAVÍ" },
  { codigo: "09205", nombre: "LONQUIMAY" },
  { codigo: "13117", nombre: "LO_PRADO" },
  { codigo: "05301", nombre: "LOS_ANDES" },
  { codigo: "14104", nombre: "LOS_LAGOS" },
  { codigo: "08206", nombre: "LOS_ÁLAMOS" },
  { codigo: "10106", nombre: "LOS_MUERMOS" },
  { codigo: "08301", nombre: "LOS_ÁNGELES" },
  { codigo: "09206", nombre: "LOS_SAUCES" },
  { codigo: "04203", nombre: "LOS_VILOS" },
  { codigo: "08106", nombre: "LOTA" },
  { codigo: "09207", nombre: "LUMACO" },
  { codigo: "06108", nombre: "MACHALÍ" },
  { codigo: "13118", nombre: "MACUL" },
  { codigo: "13119", nombre: "MAIPÚ" },
  { codigo: "06109", nombre: "MALLOA" },
  { codigo: "02302", nombre: "MARÍA_ELENA" },
  { codigo: "13504", nombre: "MARÍA_PINTO" },
  { codigo: "06204", nombre: "MARCHIHUE" },
  { codigo: "14106", nombre: "MARIQUINA" },
  { codigo: "07105", nombre: "MAULE" },
  { codigo: "10108", nombre: "MAULLÍN" },
  { codigo: "02102", nombre: "MEJILLONES" },
  { codigo: "09110", nombre: "MELIPEUCO" },
  { codigo: "13501", nombre: "MELIPILLA" },
  { codigo: "14105", nombre: "MÁFIL" },
  { codigo: "07304", nombre: "MOLINA" },
  { codigo: "04303", nombre: "MONTE_PATRIA" },
  { codigo: "06110", nombre: "MOSTAZAL" },
  { codigo: "08305", nombre: "MULCHÉN" },
  { codigo: "08306", nombre: "NACIMIENTO" },
  { codigo: "06305", nombre: "NANCAGUA" },
  { codigo: "12401", nombre: "NATALES" },
  { codigo: "06205", nombre: "NAVIDAD" },
  { codigo: "08307", nombre: "NEGRETE" },
  { codigo: "16204", nombre: "NINHUE" },
  { codigo: "05506", nombre: "NOGALES" },
  { codigo: "09111", nombre: "NUEVA_IMPERIAL" },
  { codigo: "11302", nombre: "O´HIGGINS" },
  { codigo: "06111", nombre: "OLIVAR" },
  { codigo: "02202", nombre: "OLLAGÜE" },
  { codigo: "05803", nombre: "OLMUÉ" },
  { codigo: "10301", nombre: "OSORNO" },
  { codigo: "04301", nombre: "OVALLE" },
  { codigo: "13604", nombre: "PADRE_HURTADO" },
  { codigo: "09112", nombre: "PADRE_LAS_CASAS" },
  { codigo: "04105", nombre: "PAIGUANO" },
  { codigo: "14107", nombre: "PAILLACO" },
  { codigo: "13404", nombre: "PAINE" },
  { codigo: "10404", nombre: "PALENA" },
  { codigo: "06306", nombre: "PALMILLA" },
  { codigo: "14108", nombre: "PANGUIPULLI" },
  { codigo: "05704", nombre: "PANQUEHUE" },
  { codigo: "05403", nombre: "PAPUDO" },
  { codigo: "06206", nombre: "PAREDONES" },
  { codigo: "07404", nombre: "PARRAL" },
  { codigo: "13605", nombre: "PEÑAFLOR" },
  { codigo: "13122", nombre: "PEÑALOLÉN" },
  { codigo: "13121", nombre: "PEDRO_AGUIRRE_CERDA" },
  { codigo: "07106", nombre: "PELARCO" },
  { codigo: "07203", nombre: "PELLUHUE" },
  { codigo: "16105", nombre: "PEMUCO" },
  { codigo: "07107", nombre: "PENCAHUE" },
  { codigo: "08107", nombre: "PENCO" },
  { codigo: "06307", nombre: "PERALILLO" },
  { codigo: "09113", nombre: "PERQUENCO" },
  { codigo: "05404", nombre: "PETORCA" },
  { codigo: "06112", nombre: "PEUMO" },
  { codigo: "01405", nombre: "PICA" },
  { codigo: "06113", nombre: "PICHIDEGUA" },
  { codigo: "06201", nombre: "PICHILEMU" },
  { codigo: "16106", nombre: "PINTO" },
  { codigo: "13202", nombre: "PIRQUE" },
  { codigo: "09114", nombre: "PITRUFQUÉN" },
  { codigo: "06308", nombre: "PLACILLA" },
  { codigo: "16205", nombre: "PORTEZUELO" },
  { codigo: "12301", nombre: "PORVENIR" },
  { codigo: "01401", nombre: "POZO_ALMONTE" },
  { codigo: "12302", nombre: "PRIMAVERA" },
  { codigo: "13123", nombre: "PROVIDENCIA" },
  { codigo: "05105", nombre: "PUCHUNCAVÍ" },
  { codigo: "09115", nombre: "PUCÓN" },
  { codigo: "13124", nombre: "PUDAHUEL" },
  { codigo: "13201", nombre: "PUENTE_ALTO" },
  { codigo: "10101", nombre: "PUERTO_MONTT" },
  { codigo: "10302", nombre: "PUERTO_OCTAY" },
  { codigo: "10109", nombre: "PUERTO_VARAS" },
  { codigo: "06309", nombre: "PUMANQUE" },
  { codigo: "04304", nombre: "PUNITAQUI" },
  { codigo: "12101", nombre: "PUNTA_ARENAS" },
  { codigo: "10206", nombre: "PUQUELDÓN" },
  { codigo: "09208", nombre: "PURÉN" },
  { codigo: "10303", nombre: "PURRANQUE" },
  { codigo: "05705", nombre: "PUTAENDO" },
  { codigo: "15201", nombre: "PUTRE" },
  { codigo: "10304", nombre: "PUYEHUE" },
  { codigo: "10207", nombre: "QUEILÉN" },
  { codigo: "10208", nombre: "QUELLÓN" },
  { codigo: "10209", nombre: "QUEMCHI" },
  { codigo: "08308", nombre: "QUILACO" },
  { codigo: "13125", nombre: "QUILICURA" },
  { codigo: "08309", nombre: "QUILLECO" },
  { codigo: "16107", nombre: "QUILLÓN" },
  { codigo: "05501", nombre: "QUILLOTA" },
  { codigo: "05801", nombre: "QUILPUÉ" },
  { codigo: "10210", nombre: "QUINCHAO" },
  { codigo: "06114", nombre: "QUINTA_DE_TILCOCO" },
  { codigo: "13126", nombre: "QUINTA_NORMAL" },
  { codigo: "05107", nombre: "QUINTERO" },
  { codigo: "16201", nombre: "QUIRIHUE" },
  { codigo: "06101", nombre: "RANCAGUA" },
  { codigo: "07305", nombre: "RAUCO" },
  { codigo: "13127", nombre: "RECOLETA" },
  { codigo: "09209", nombre: "RENAICO" },
  { codigo: "13128", nombre: "RENCA" },
  { codigo: "06115", nombre: "RENGO" },
  { codigo: "06116", nombre: "REQUÍNOA" },
  { codigo: "07405", nombre: "RETIRO" },
  { codigo: "05303", nombre: "RINCONADA" },
  { codigo: "16206", nombre: "RÁNQUIL" },
  { codigo: "14204", nombre: "RÍO_BUENO" },
  { codigo: "07108", nombre: "RÍO_CLARO" },
  { codigo: "04305", nombre: "RÍO_HURTADO" },
  { codigo: "11402", nombre: "RÍO_IBÁÑEZ" },
  { codigo: "07306", nombre: "ROMERAL" },
  { codigo: "10305", nombre: "RÍO_NEGRO" },
  { codigo: "12103", nombre: "RÍO_VERDE" },
  { codigo: "09116", nombre: "SAAVEDRA" },
  { codigo: "07307", nombre: "SAGRADA_FAMILIA" },
  { codigo: "04204", nombre: "SALAMANCA" },
  { codigo: "05601", nombre: "SAN_ANTONIO" },
  { codigo: "13401", nombre: "SAN_BERNARDO" },
  { codigo: "16301", nombre: "SAN_CARLOS" },
  { codigo: "07109", nombre: "SAN_CLEMENTE" },
  { codigo: "05304", nombre: "SAN_ESTEBAN" },
  { codigo: "16304", nombre: "SAN_FABIÁN" },
  { codigo: "05701", nombre: "SAN_FELIPE" },
  { codigo: "06301", nombre: "SAN_FERNANDO" },
  { codigo: "12104", nombre: "SAN_GREGORIO" },
  { codigo: "16108", nombre: "SAN_IGNACIO" },
  { codigo: "07406", nombre: "SAN_JAVIER" },
  { codigo: "13129", nombre: "SAN_JOAQUÍN" },
  { codigo: "13203", nombre: "SAN_JOSÉ_DE_MAIPO" },
  { codigo: "10306", nombre: "SAN_JUAN_DE_LA_COSTA" },
  { codigo: "13130", nombre: "SAN_MIGUEL" },
  { codigo: "16305", nombre: "SAN_NICOLÁS" },
  { codigo: "10307", nombre: "SAN_PABLO" },
  { codigo: "13505", nombre: "SAN_PEDRO" },
  { codigo: "02203", nombre: "SAN_PEDRO_DE_ATACAMA" },
  { codigo: "08108", nombre: "SAN_PEDRO_DE_LA_PAZ" },
  { codigo: "07110", nombre: "SAN_RAFAEL" },
  { codigo: "13131", nombre: "SAN_RAMÓN" },
  { codigo: "08310", nombre: "SAN_ROSENDO" },
  { codigo: "08311", nombre: "SANTA_BÁRBARA" },
  { codigo: "06310", nombre: "SANTA_CRUZ" },
  { codigo: "08109", nombre: "SANTA_JUANA" },
  { codigo: "05706", nombre: "SANTA_MARÍA" },
  { codigo: "13101", nombre: "SANTIAGO" },
  { codigo: "05606", nombre: "SANTO_DOMINGO" },
  { codigo: "06117", nombre: "SAN_VICENTE" },
  { codigo: "02103", nombre: "SIERRA_GORDA" },
  { codigo: "13601", nombre: "TALAGANTE" },
  { codigo: "07101", nombre: "TALCA" },
  { codigo: "08110", nombre: "TALCAHUANO" },
  { codigo: "02104", nombre: "TALTAL" },
  { codigo: "09101", nombre: "TEMUCO" },
  { codigo: "07308", nombre: "TENO" },
  { codigo: "09117", nombre: "TEODORO_SCHMIDT" },
  { codigo: "03103", nombre: "TIERRA_AMARILLA" },
  { codigo: "13303", nombre: "TILTIL" },
  { codigo: "12303", nombre: "TIMAUKEL" },
  { codigo: "08207", nombre: "TIRÚA" },
  { codigo: "02301", nombre: "TOCOPILLA" },
  { codigo: "09118", nombre: "TOLTÉN" },
  { codigo: "08111", nombre: "TOMÉ" },
  { codigo: "12402", nombre: "TORRES_DEL_PAINE" },
  { codigo: "11303", nombre: "TORTEL" },
  { codigo: "09210", nombre: "TRAIGUÉN" },
  { codigo: "16207", nombre: "TREHUACO" },
  { codigo: "08312", nombre: "TUCAPEL" },
  { codigo: "13120", nombre: "ÑUÑOA" },
  { codigo: "14101", nombre: "VALDIVIA" },
  { codigo: "03301", nombre: "VALLENAR" },
  { codigo: "05101", nombre: "VALPARAÍSO" },
  { codigo: "05109", nombre: "VIÑA_DEL_MAR" },
  { codigo: "07309", nombre: "VICHUQUÉN" },
  { codigo: "09211", nombre: "VICTORIA" },
  { codigo: "04106", nombre: "VICUÑA" },
  { codigo: "09119", nombre: "VILCÚN" },
  { codigo: "07407", nombre: "VILLA_ALEGRE" },
  { codigo: "05804", nombre: "VILLA_ALEMANA" },
  { codigo: "09120", nombre: "VILLARRICA" },
  { codigo: "13132", nombre: "VITACURA" },
  { codigo: "07408", nombre: "YERBAS_BUENAS" },
  { codigo: "08313", nombre: "YUMBEL" },
  { codigo: "16109", nombre: "YUNGAY" },
  { codigo: "05405", nombre: "ZAPALLAR" }
];

// Directorio donde se guardarán los archivos HTML
const outputDir = './comunas-html';

// Crear el directorio si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Función para descargar el HTML de una comuna
async function descargarComuna(browser, comuna) {
  const { codigo, nombre } = comuna;
  console.log(`Descargando comuna: ${nombre} (${codigo})`);

  // Construir URL de la ficha comunal
  const url = `https://datos.sinim.gov.cl/impresion_ficha_comunal.php?municipio=${codigo}&provincia=T&region=T`;
  
  try {
    // Abrir una nueva página
    const page = await browser.newPage();
    
    // Configurar timeout más largo para cargar páginas pesadas
    await page.setDefaultNavigationTimeout(60000); // 60 segundos
    
    // Ir a la URL
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Esperar a que la página cargue completamente
    await page.waitForSelector('body', { timeout: 30000 });
    
    // Obtener el HTML completo
    const content = await page.content();
    
    // Guardar el HTML en un archivo
    const filename = `Comuna-${nombre}.html`;
    const filePath = path.join(outputDir, filename);
    fs.writeFileSync(filePath, content);
    
    console.log(`✅ Comuna ${nombre} guardada correctamente en ${filePath}`);
    
    // Cerrar la página
    await page.close();
    
    return true;
  } catch (error) {
    console.error(`❌ Error al descargar la comuna ${nombre}: ${error.message}`);
    return false;
  }
}

// Función principal para descargar todas las comunas
async function descargarTodasLasComunas() {
  // Iniciar el navegador
  const browser = await puppeteer.launch({
    headless: 'new', // Usar el nuevo modo headless
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  // Contador de éxitos y fallos
  let exitos = 0;
  let fallos = 0;
  
  // Procesar secuencialmente para evitar problemas de sobrecarga
  for (const comuna of comunas) {
    const resultado = await descargarComuna(browser, comuna);
    
    if (resultado) {
      exitos++;
    } else {
      fallos++;
    }
    
    // Pausa entre descargas para no sobrecargar el servidor
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Cerrar el navegador
  await browser.close();
  
  console.log(`\n 🚩 Proceso completado!`);
  console.log(`✅ Comunas descargadas correctamente: ${exitos}`);
  console.log(`❌ Comunas con errores: ${fallos}`);
}

// Iniciar el proceso de descarga
console.log('💻 Iniciando descarga de fichas comunales de Chile...');
descargarTodasLasComunas().catch(error => {
  console.error(`Error general en el proceso: ${error.message}`);
});