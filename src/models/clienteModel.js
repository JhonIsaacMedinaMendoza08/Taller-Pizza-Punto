async function crearCliente(db, cliente) {
    const resultado = await db.collection('clientes').insertOne(cliente);
    return resultado.insertedId;
}

async function obtenerClientes(db) {
    return db.collection('clientes').find().toArray();
}

module.exports = {
    crearCliente,
    obtenerClientes
};