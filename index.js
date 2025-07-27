const inquirer = require('inquirer');
const connectDB = require('./src/utils/db.js');
const gestionarIngredientes = require('./src/menus/ingredientesMenu');
const gestionarPizzas = require('./src/menus/pizzasMenu.js');
const gestionarClientes = require('./src/menus/clientesMenu.js');
const gestionarRepartidores = require('./src/menus/repartidoresMenu.js');
const {realizarPedido} = require('./src/services/pedidoService.js');
const gestionarReportes = require('./src/menus/reportesMenu.js');

(async () => {
    const { db, client } = await connectDB();

    const { opcion } = await inquirer.prompt([
        {
            type: 'list',
            name: 'opcion',
            message: '📦 ¿Qué deseas hacer?',
            choices: [
                'Realizar nuevo Pedido',
                'Gestionar Pizzas',
                'Gestionar ingredientes',
                'Gestionar Clientes',
                'Gestionar Repartidores',
                'Gestionar Reportes',
                'Salir'
            ]
        }
    ]);

    if (opcion === 'Realizar nuevo Pedido') {
        await realizarPedido(db, client);
    }

    if (opcion === 'Gestionar Pizzas') {
        await gestionarPizzas(db);
    }

    if (opcion === 'Gestionar ingredientes') {
        await gestionarIngredientes(db);
    }

    if (opcion === 'Gestionar Clientes') {
        await gestionarClientes(db);
    }

    if (opcion === 'Gestionar Repartidores') {
        await gestionarRepartidores(db);
    }

    if (opcion === 'Gestionar Reportes') {
        await gestionarReportes(db);
    }

    if (opcion === 'Salir') {
        console.log('👋 ¡Hasta luego!');
    }

    process.exit(0);
})();
