
async function crearIngrediente(db, ingrediente) {
    const resultado = await db.collection('ingredientes').insertOne(ingrediente);
    return resultado.insertedId;
}

async function obtenerIngredientes(db) {
    return db.collection('ingredientes').find().toArray();
}

async function actualizarStockIngrediente(db, nombre, nuevoStock) {
    return db.collection('ingredientes').updateOne(
        { nombre },
        { $set: { stock: nuevoStock } }
    );
}

async function eliminarIngrediente(db, nombre) {
    return db.collection('ingredientes').deleteOne({ nombre: nombre });
}

module.exports = {
    crearIngrediente,
    obtenerIngredientes,
    actualizarStockIngrediente,
    eliminarIngrediente
};
