
async function crearIngrediente(db, ingrediente) {
    const resultado = await db.collection('ingredientes').insertOne(ingrediente);
    return resultado.insertedId;
}

async function obtenerIngredientes(db) {
    return db.collection('ingredientes').find().toArray();
}

async function actualizarStockIngredeinte(db, nombre, cantidad) {
    return db.collection('ingredientes').updateOne(
        { nombre: nombre },
        { $inc: { stock: cantidad } }
    );
    
}

async function eliminarIngrediente(db, nombre) {
    return db.collection('ingredientes').deleteOne({ nombre: nombre });
}

module.exports = {
    crearIngrediente,
    obtenerIngredientes,
    actualizarStockIngredeinte,
    eliminarIngrediente
};
