const inquirer = require('inquirer')
const { crearCliente, obtenerClientes } = require('../models/clienteModel.js')

async function registrarNuevoCliente(db) {
    const respuestas = await inquirer.prompt([
        {
            type: 'input',
            name: 'nombre',
            message: '👤 Nombre del cliente:',
            validate: input => input.trim() !== '' || 'El nombre no puede estar vacío.'
        },
        {
            type: 'input',
            name: 'telefono',
            message: '📞 Teléfono del cliente:',
            validate: input => input.trim() !== '' || 'El Teléfono no puede estar vacío.'
        },
        {
            type: 'input',
            name: 'direccion',
            message: '🏠 Dirección del cliente:',
            validate: input => input.trim() !== '' || 'La Dirección no puede estar vacía.'
        }
    ]);

    const cliente = {
        nombre: respuestas.nombre,
        telefono: respuestas.telefono,
        direccion: respuestas.direccion
    };
    await crearCliente(db, cliente);
    console.log(`✅ Cliente registrado con éxito: ${cliente.nombre}`);
}

async function mostrarClientes(db) {
    const clientes = await obtenerClientes(db);
    console.log('\n📋 Lista de clientes:\n');
    clientes.forEach(c => {
        console.log(`👤 ${c.nombre} | Tel: ${c.telefono} | Dirección: ${c.direccion}`);
    });
    console.log('');
}
async function editarCliente(db) {
    const clientes = await obtenerClientes(db);
    if (clientes.length === 0) {
        console.log('❌ No hay clientes registrados.');
        return;
    }

    const { clienteSeleccionado } = await inquirer.prompt([
        {
            type: 'list',
            name: 'clienteSeleccionado',
            message: '✏️ ¿Qué cliente deseas editar?',
            choices: clientes.map(c => c.nombre)

        }
    ]);

    const clienteActual = clientes.find(c => c.nombre === clienteSeleccionado);

    const respuestas = await inquirer.prompt([
        {
            type: 'input',
            name: 'telefono',
            message: `📞 Nuevo teléfono (actual: ${clienteActual.telefono}):`,
            default: clienteActual.telefono
        },
        {
            type: 'input',
            name: 'direccion',
            message: `🏠 Nueva dirección (actual: ${clienteActual.direccion}):`,
            default: clienteActual.direccion
        }
    ]);

    await db.collection('clientes').updateOne(
        { nombre: clienteSeleccionado },
        {
            $set: {
                telefono: respuestas.telefono,
                direccion: respuestas.direccion
            }
        }
    );

    console.log(`✅ Cliente actualizado: ${clienteSeleccionado}`);
}


async function eliminarCliente(db) {
    const clientes = await obtenerClientes(db);
    if (clientes.length === 0) {
        console.log('❌ No hay clientes para eliminar.');
        return;
    }

    const { clienteEliminar } = await inquirer.prompt([
        {
            type: 'list',
            name: 'clienteEliminar',
            message: '🗑️ ¿Qué cliente deseas eliminar?',
            choices: clientes.map(c => c.nombre)


        }
    ]);

    const confirmacion = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmar',
            message: `¿Estás seguro de eliminar "${clienteEliminar}"?`,
            default: false
        }
    ]);

    if (confirmacion.confirmar) {
        await db.collection('clientes').deleteOne({ nombre: clienteEliminar });
        console.log('🗑️ Cliente eliminado con éxito.');
    } else {
        console.log('❌ Operación cancelada.');
    }
}

module.exports = {
    registrarNuevoCliente,
    mostrarClientes,
    editarCliente,
    eliminarCliente
};
