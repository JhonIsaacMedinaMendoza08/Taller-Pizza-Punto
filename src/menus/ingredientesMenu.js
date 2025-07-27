const inquirer = require('inquirer');
const chalk = require('chalk');
const {
    registrarNuevoIngrediente,
    mostrarIngredientes,
    editarIngrediente,
    eliminarIngrediente
} = require('../services/ingredienteService');

async function gestionarIngredientes(db) {
    let salir = false;

    while (!salir) {
        console.clear();
        console.log(chalk.magentaBright('\n🧂 Gestión de Ingredientes'));
        console.log(chalk.gray('────────────────────────────────────────────\n'));

        const { opcion } = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcion',
                message: chalk.cyan('📋 Elige una opción:'),
                choices: [
                    '➕ Registrar nuevo ingrediente',
                    '📄 Ver ingredientes',
                    '✏️ Editar ingrediente',
                    '🗑️ Eliminar ingrediente',
                    '⬅️ Volver al menú principal'
                ]
            }
        ]);

        switch (opcion) {
            case '➕ Registrar nuevo ingrediente':
                await registrarNuevoIngrediente(db);
                break;
            case '📄 Ver ingredientes':
                await mostrarIngredientes(db);
                break;
            case '✏️ Editar ingrediente':
                await editarIngrediente(db);
                break;
            case '🗑️ Eliminar ingrediente':
                await eliminarIngrediente(db);
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

module.exports = gestionarIngredientes;
