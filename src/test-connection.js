// Importa la función connectDB desde el archivo de utilidades de base de datos
const connectDB = require('./utils/db');

// IIFE (Immediately Invoked Function Expression): se define y ejecuta automáticamente
(async () => {
  // Espera a que se establezca la conexión con la base de datos y guarda la instancia
  const db = await connectDB();

  // Obtiene todas las colecciones existentes en la base de datos y las convierte en un array
  const collections = await db.listCollections().toArray();

  // Imprime en consola los nombres de las colecciones disponibles en la base de datos
  console.log("Colecciones disponibles:", collections.map(col => col.name));
})();
