async function crearPizza(db, pizza) {
    const resultado = await db.collection('pizzas').insertOne(pizza);
    return resultado.insertedId;
    
}

async function obtenerPizzas(db) {
    return db.collection('pizzas').find().toArray();
}

module.exports = {
    crearPizza,
    obtenerPizzas
};