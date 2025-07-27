const connectDB = require('./utils/db');

async function setup() {
  const db = await connectDB();

  const requiredCollections = ['ingredientes', 'pizzas', 'clientes', 'repartidores', 'pedidos'];

  const existingCollections = await db.listCollections().toArray();
  const existingNames = existingCollections.map(col => col.name);

  for (const col of requiredCollections) {
    if (!existingNames.includes(col)) {
      await db.createCollection(col);
      console.log(`✅ Colección '${col}' creada.`);

      // Opcional: semilla de datos
      if (col === 'ingredientes') {
        await db.collection(col).insertMany([
          { nombre: 'Mozzarella', tipo: 'queso', stock: 50 },
          { nombre: 'Salsa de tomate', tipo: 'salsa', stock: 40 },
          { nombre: 'Pepperoni', tipo: 'topping', stock: 30 }
        ]);
        console.log(`🌱 Semilla añadida a '${col}'`);
      }

      if (col === 'repartidores') {
        await db.collection(col).insertMany([
          { nombre: 'Carlos', zona: 'Norte', estado: 'disponible' },
          { nombre: 'Lucía', zona: 'Sur', estado: 'disponible' }
        ]);
        console.log(`🌱 Semilla añadida a '${col}'`);
      }
    } else {
      console.log(`ℹ️ Colección '${col}' ya existe.`);
    }
  }

  console.log("🏁 Setup finalizado.");
  process.exit(0);
}

setup();
