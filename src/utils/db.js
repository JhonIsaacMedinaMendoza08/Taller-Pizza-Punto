// Importa el cliente de MongoDB desde el paquete oficial
const { MongoClient } = require('mongodb');

// Carga las variables de entorno desde un archivo .env (por ejemplo, MONGO_URI)
require('dotenv').config();

// Crea una nueva instancia del cliente MongoDB utilizando la URI definida en las variables de entorno
const client = new MongoClient(process.env.MONGO_URI);

/**
 * Función asíncrona para establecer la conexión con MongoDB Atlas
 */
async function connectDB() {
  try {
    // Intenta conectar al servidor de MongoDB usando la instancia del cliente
    await client.connect();

    // Si la conexión es exitosa, se imprime un mensaje en consola
    console.log("✅ Conectado a MongoDB Atlas");

    // Retorna la instancia de la base de datos para usar en otras partes de la aplicación
    return client.db();
  } catch (err) {
    // Si ocurre un error durante la conexión, lo muestra en consola
    console.error("❌ Error de conexión:", err);

    // Termina el proceso de Node.js con un código de error (1)
    process.exit(1);
  }
}

// Exporta la función para que pueda ser utilizada en otros módulos del proyecto
module.exports = connectDB;
