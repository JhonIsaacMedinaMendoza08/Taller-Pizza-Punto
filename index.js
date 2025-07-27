const inquirer = require('inquirer');
const connectDB = require('./src/utils/db.js');
const gestionarIngredientes = require('./src/menus/ingredientesMenu');
const gestionarPizzas = require('./src/menus/pizzasMenu.js');


(async () => {
    const db = await connectDB();

    const { opcion } = await inquirer.prompt([
        {
            type: 'list',
            name: 'opcion',
            message: '📦 ¿Qué deseas hacer?',
            choices: [
                'Gestionar Pizzas',
                'Gestionar ingredientes',
                'Salir'
            ]
        }
    ]);

    if (opcion === 'Gestionar Pizzas') {
        await gestionarPizzas(db);
    }

    if (opcion === 'Gestionar ingredientes') {
        await gestionarIngredientes(db);
    }

    if (opcion === 'Salir') {
        console.log('👋 ¡Hasta luego!');
    }

    process.exit(0);
})();
