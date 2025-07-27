async function crearPedido(db, pedido) {
    const resultado = await db.collection('pedidos').insertOne(pedido);
    return resultado.insertedId;
}

async function obtenerPedidos(db) {
    return db.collection('pedidos').find().toArray();
}

module.exports = {
    crearPedido,
    obtenerPedidos
};