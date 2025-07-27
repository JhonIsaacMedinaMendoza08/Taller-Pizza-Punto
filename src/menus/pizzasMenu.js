const inquirer = require('inquirer')
const { registrarNuevaPizza, listarPizzas } = require('../services/pizzaService.js');

async function gestionarPizzas(db) {
    let salir = false;

    while (!salir) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcion',
                message: '🧂 Gestión de Pizzas - Elige una opción:',
                choices: [
                    'Registrar nueva Pizza',
                    'Ver Pizzas',
                    '⬅️ Volver al menú principal'
                ]
            }
        ]);

        switch (opcion) {
            case 'Registrar nueva Pizza':
                await registrarNuevaPizza(db);
                break;
            case 'Ver Pizzas':
                await listarPizzas(db);
                break;
            case '⬅️ Volver al menú principal':
                salir = true;
                break;
        }
    }
}

module.exports = gestionarPizzas;
