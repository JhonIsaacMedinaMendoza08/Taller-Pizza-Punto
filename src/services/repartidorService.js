const inquirer = require('inquirer');

async function registrarRepartidor(db) {
    const respuestas = await inquirer.prompt([
        {
            type: 'input',
            name: 'nombre',
            message: '🛵 Nombre del repartidor:'
        },
        {
            type: 'list',
            name: 'zona',
            message: '📍 Zona de entrega:',
            choices: ["Norte", "Sur", "Centro", "Occidente"]
        }
    ]);

    const repartidor = {
        nombre: respuestas.nombre,
        zona: respuestas.zona,
        estado: '✅ disponible'
    };

    await db.collection('repartidores').insertOne(repartidor);
    console.log(`✅ Repartidor registrado: ${repartidor.nombre}`);
}

async function mostrarRepartidores(db) {
    const lista = await db.collection('repartidores').find().toArray();

    console.log('\n📋 Lista de repartidores:\n');
    lista.forEach(r => {
        console.log(`🛵 ${r.nombre} | Zona: ${r.zona} | Estado: ${r.estado}`);
    });
    console.log('');
}

async function editarEstadoRepartidor(db) {
    const lista = await db.collection('repartidores').find().toArray();
    if (lista.length === 0) {
        console.log('❌ No hay repartidores disponibles.');
        return;
    }

    const { seleccionado } = await inquirer.prompt([
        {
            type: 'list',
            name: 'seleccionado',
            message: '✏️ ¿Qué repartidor deseas actualizar?',
            choices: lista.map(r => r.nombre).filter(Boolean)
        }
    ]);

    const { nuevoEstado } = await inquirer.prompt([
        {
            type: 'list',
            name: 'nuevoEstado',
            message: `📦 Nuevo estado para ${seleccionado}:`,
            choices: ['✅ disponible', '❌ ocupado']
        }
    ]);

    await db.collection('repartidores').updateOne(
        { nombre: seleccionado },
        { $set: { estado: nuevoEstado } }
    );

    console.log('✅ Estado actualizado.');
}

async function eliminarRepartidor(db) {
    const lista = await db.collection('repartidores').find().toArray();
    if (lista.length === 0) {
        console.log('❌ No hay repartidores para eliminar.');
        return;
    }

    const { repartidorEliminar } = await inquirer.prompt([
        {
            type: 'list',
            name: 'repartidorEliminar',
            message: '🗑️ ¿Qué repartidor deseas eliminar?',
            choices: lista.map(r => r.nombre).filter(Boolean)
        }
    ]);

    const confirmacion = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmar',
            message: `¿Eliminar al repartidor "${repartidorEliminar}"?`,
            default: false
        }
    ]);

    if (confirmacion.confirmar) {
        await db.collection('repartidores').deleteOne({ nombre: repartidorEliminar });
        console.log('🗑️ Repartidor eliminado.');
    } else {
        console.log('❌ Operación cancelada.');
    }
}

module.exports = {
    registrarRepartidor,
    mostrarRepartidores,
    editarEstadoRepartidor,
    eliminarRepartidor
};
