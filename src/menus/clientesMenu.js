const inquirer = require('inquirer');
const chalk = require('chalk');
const {
    registrarNuevoCliente,
    mostrarClientes,
    editarCliente,
    eliminarCliente
} = require('../services/clienteService');

async function gestionarClientes(db) {
    let salir = false;

    while (!salir) {
        console.clear();
        console.log(chalk.blueBright('\n👤 Gestión de Clientes'));
        console.log(chalk.gray('────────────────────────────────────────────\n'));

        const { opcion } = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcion',
                message: chalk.cyan('📋 Elige una opción:'),
                choices: [
                    '🆕 Registrar nuevo cliente',
                    '📄 Ver clientes',
                    '✏️ Editar cliente',
                    '🗑️ Eliminar cliente',
                    '⬅️ Volver al menú principal'
                ]
            }
        ]);

        switch (opcion) {
            case '🆕 Registrar nuevo cliente':
                await registrarNuevoCliente(db);
                break;
            case '📄 Ver clientes':
                await mostrarClientes(db);
                break;
            case '✏️ Editar cliente':
                await editarCliente(db);
                break;
            case '🗑️ Eliminar cliente':
                await eliminarCliente(db);
                break;
            case '⬅️ Volver al menú principal':
                salir = true;
                break;
        }

        if (!salir) {
            await inquirer.prompt([
                {
                    type: 'input',
                    name: 'continuar',
                    message: chalk.gray('\nPresiona ENTER para continuar...')
                }
            ]);
        }
    }
}

module.exports = gestionarClientes;
