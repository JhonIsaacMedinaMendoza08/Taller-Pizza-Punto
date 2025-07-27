const { ObjectId } = require('mongodb');
const inquirer = require('inquirer');

// 📌 1. Ingredientes más utilizados en el último mes
async function ingredientesMasUsados(db) {
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - 1); // últimos 30 días

    const pipeline = [
        {
            $match: { fecha: { $gte: fechaLimite } }
        },
        {
            $lookup: {
                from: 'pizzas',
                localField: 'pizzas',
                foreignField: '_id',
                as: 'pizzasInfo'
            }
        },
        {
            $unwind: '$pizzasInfo'
        },
        {
            $unwind: '$pizzasInfo.ingredientes'
        },
        {
            $group: {
                _id: '$pizzasInfo.ingredientes',
                totalUsos: { $sum: 1 }
            }
        },
        {
            $sort: { totalUsos: -1 }
        }
    ];

    const resultado = await db.collection('pedidos').aggregate(pipeline).toArray();

    console.log('\n🥇 Ingredientes más utilizados en el último mes:\n');
    resultado.forEach(i => {
        console.log(`- ${i._id}: ${i.totalUsos} usos`);
    });
}

// 📌 2. Promedio de precios por categoría de pizza
async function promedioPreciosPorCategoria(db) {
    const pipeline = [
        {
            $group: {
                _id: '$categoria',
                promedioPrecio: { $avg: '$precio' },
                cantidad: { $sum: 1 }
            }
        },
        {
            $sort: { promedioPrecio: -1 }
        }
    ];

    const resultado = await db.collection('pizzas').aggregate(pipeline).toArray();

    console.log('\n💰 Promedio de precios por categoría:\n');
    resultado.forEach(c => {
        console.log(`- ${c._id}: $${c.promedioPrecio.toFixed(2)} (${c.cantidad} pizzas)`);
    });
}

// 📌 3. Categoría de pizzas más vendida históricamente
async function categoriaMasVendida(db) {
    const pipeline = [
        {
            $lookup: {
                from: 'pizzas',
                localField: 'pizzas',
                foreignField: '_id',
                as: 'pizzasInfo'
            }
        },
        {
            $unwind: '$pizzasInfo'
        },
        {
            $group: {
                _id: '$pizzasInfo.categoria',
                totalVendidas: { $sum: 1 }
            }
        },
        {
            $sort: { totalVendidas: -1 }
        }
    ];

    const resultado = await db.collection('pedidos').aggregate(pipeline).toArray();

    console.log('\n🔥 Categorías de pizza más vendidas:\n');
    resultado.forEach(c => {
        console.log(`- ${c._id}: ${c.totalVendidas} ventas`);
    });
}

module.exports = {
    ingredientesMasUsados,
    promedioPreciosPorCategoria,
    categoriaMasVendida
};
