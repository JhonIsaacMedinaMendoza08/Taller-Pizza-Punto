const inquirer = require('inquirer')
const { ObjectId } = require('mongodb');

async function realizarPedido(db, client) {
    const session = client.startSession();

    try {
        const clientes = await db.collection('clientes').find().toArray();
        if (clientes.length === 0) throw new Error('No hay clientes registrados')
        const { clienteSeleccionado } = await inquirer.prompt([
            {
                type: 'list',
                name: 'clienteSeleccionado',
                message: '👤 Selecciona el cliente:',
                choices: clientes.map(c => ({ name: `${c.nombre} - ${c.telefono}`, value: c._id }))
            }
        ]);
        const pizzas = await db.collection('pizzas').find().toArray();
        if (pizzas.length === 0) throw new Error('No hay pizzas registradas.');

        const { pizzasSeleccionadas } = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'pizzasSeleccionadas',
                message: '🍕 Selecciona las pizzas del pedido:',
                choices: pizzas.map(p => ({
                    name: `${p.nombre} ($${p.precio})`,
                    value: p._id
                }))
            }
        ]);

        if (pizzasSeleccionadas.length === 0) {
            console.log('⚠️ No se seleccionaron pizzas.')
            return;
        }

        await session.withTransaction(async () => {
            let total = 0;
            const ingredientesUsados = {}

            for (const pizzaId of pizzasSeleccionadas) {
                const pizza = pizzas.find(p => p._id.toString() === pizzaId.toString());
                total += pizza.precio;

                for (const ingredienteNombre of pizza.ingredientes) {
                    ingredientesUsados[ingredienteNombre] = (ingredientesUsados[ingredienteNombre] || 0) + 1;
                }
            }
            for (const nombre in ingredientesUsados) {
                const ingrediente = await db.collection('ingredientes').findOne({ nombre }, { session })

                if (!ingrediente || ingrediente.stock < ingredientesUsados[nombre]) {
                    throw new Error(`❌ Ingrediente insuficiente: ${nombre}`);
                }
                await db.collection('ingredientes').updateOne(
                    { nombre },
                    { $inc: { stock: -ingredientesUsados[nombre] } },
                    { session }
                );
            }

            const repartidor = await db.collection('repartidores').findOne({ estado: '✅ disponible' }, { session });
            if (!repartidor) throw new Error('❌ No hay repartidores disponibles.');

            await db.collection('repartidores').updateOne(
                { _id: repartidor._id },
                { $set: { estado: '❌ ocupado' } },
                { session }
            );

            const pedido = {
                clienteId: new ObjectId(clienteSeleccionado),
                pizzas: pizzasSeleccionadas.map(id => new ObjectId(id)),
                total,
                fecha: new Date(),
                repartidorAsignado: repartidor._id
            };

            await db.collection('pedidos').insertOne(pedido, { session });

            console.log(`✅ Pedido realizado con total: $${total.toFixed(2)} y repartidor: ${repartidor.nombre}`);
        })


    } catch (error) {
        console.error('❌ Pedido cancelado', error)
    } finally {
        await session.endSession()
    }

}

module.exports = {
    realizarPedido
}