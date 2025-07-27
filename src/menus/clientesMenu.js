const inquirer = require('inquirer');
const {
    registrarNuevoCliente,
    mostrarClientes,
    editarCliente,
    eliminarCliente
} = require('../services/clienteService');

async function gestionarClientes(db) {
    let salir = false;

    while (!salir) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcion',
                message: '👤 Gestión de Clientes - Elige una opción:',
                choices: [
                    'Registrar nuevo cliente',
                    'Ver clientes',
                    'Editar cliente',
                    'Eliminar cliente',
                    '⬅️ Volver al menú principal'
                ]
            }
        ]);

        switch (opcion) {
            case 'Registrar nuevo cliente':
                await registrarNuevoCliente(db);
                break;
            case 'Ver clientes':
                await mostrarClientes(db);
                break;
            case 'Editar cliente':
                await editarCliente(db);
                break;
            case 'Eliminar cliente':
                await eliminarCliente(db);
                break;
            case '⬅️ Volver al menú principal':
                salir = true;
                break;
        }
    }
}

module.exports = gestionarClientes;
