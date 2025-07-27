async function obtenerRepartidorDisponible(db){
    return db.collection('repartidores').findOne({estado: 'disponible'});
}

async function actualizarEstadoRepartidor(db, id, estado) {
    return db.collection('repartidores').updateOne(
        { _id: id },
        { $set: { estado } }
    );
    
}

module.exports = {
    obtenerRepartidorDisponible,
    actualizarEstadoRepartidor
};