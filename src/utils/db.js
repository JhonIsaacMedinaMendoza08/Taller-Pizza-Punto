const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
  try {
    await client.connect();
    const dbName = process.env.MONGO_URI.split('/').pop().split('?')[0];
    const db = client.db(dbName);
    console.log("✅ Conectado a MongoDB Atlas");
    return db;
  } catch (err) {
    console.error("❌ Error de conexión:", err);
    process.exit(1);
  }
}

module.exports = connectDB;
