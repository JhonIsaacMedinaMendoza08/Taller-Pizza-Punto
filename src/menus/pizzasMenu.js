const inquirer = require('inquirer');
const chalk = require('chalk');
const { registrarNuevaPizza, listarPizzas } = require('../services/pizzaService.js');

async function gestionarPizzas(db) {
    let salir = false;

    while (!salir) {
        console.clear();
        console.log(chalk.yellowBright('\n🍕 Gestión de Pizzas'));
        console.log(chalk.gray('────────────────────────────────────────────\n'));

        const { opcion } = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcion',
                message: chalk.cyan('📋 Elige una opción:'),
                choices: [
                    '➕ Registrar nueva pizza',
                    '📄 Ver pizzas',
                    '⬅️ Volver al menú principal'
                ]
            }
        ]);

        switch (opcion) {
            case '➕ Registrar nueva pizza':
                await registrarNuevaPizza(db);
                break;
            case '📄 Ver pizzas':
                await listarPizzas(db);
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

module.exports = gestionarPizzas;
