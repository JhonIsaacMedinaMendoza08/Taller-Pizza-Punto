const inquirer = require('inquirer');
const chalk = require('chalk');
const {
    registrarRepartidor,
    mostrarRepartidores,
    editarEstadoRepartidor,
    eliminarRepartidor
} = require('../services/repartidorService');

async function gestionarRepartidores(db) {
    let salir = false;

    while (!salir) {
        console.clear();
        console.log(chalk.cyanBright('\n🛵 Gestión de Repartidores'));
        console.log(chalk.gray('────────────────────────────────────────────\n'));

        const { opcion } = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcion',
                message: chalk.cyan('📋 Elige una opción:'),
                choices: [
                    '➕ Registrar nuevo repartidor',
                    '📄 Ver repartidores',
                    '🔄 Editar estado del repartidor',
                    '🗑️ Eliminar repartidor',
                    '⬅️ Volver al menú principal'
                ]
            }
        ]);

        switch (opcion) {
            case '➕ Registrar nuevo repartidor':
                await registrarRepartidor(db);
                break;
            case '📄 Ver repartidores':
                await mostrarRepartidores(db);
                break;
            case '🔄 Editar estado del repartidor':
                await editarEstadoRepartidor(db);
                break;
            case '🗑️ Eliminar repartidor':
                await eliminarRepartidor(db);
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

module.exports = gestionarRepartidores;
