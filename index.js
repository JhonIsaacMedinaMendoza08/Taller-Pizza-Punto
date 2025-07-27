const inquirer = require('inquirer');
const connectDB = require('./src/utils/db.js');
const gestionarIngredientes = require('./src/menus/ingredientesMenu');
const gestionarPizzas = require('./src/menus/pizzasMenu.js');
const gestionarClientes = require('./src/menus/clientesMenu.js');
const gestionarRepartidores = require('./src/menus/repartidoresMenu.js');
const { realizarPedido } = require('./src/services/pedidoService.js');
const gestionarReportes = require('./src/menus/reportesMenu.js');

let db, client;

// 🎯 Función principal reutilizable
async function mostrarMenuPrincipal() {

    console.clear();
    const { db, client } = await connectDB();
    console.log('\n===========================================');
    console.log('🍕  BIENVENIDO A PIZZA Y PUNTO - SISTEMA  ');
    console.log('===========================================\n');

    const { opcion } = await inquirer.prompt([
        {
            type: 'list',
            name: 'opcion',
            message: '📦 ¿Qué deseas hacer?',
            choices: [
                '📦 Realizar nuevo Pedido',
                '🍕 Gestionar Pizzas',
                '🧀 Gestionar Ingredientes',
                '👤 Gestionar Clientes',
                '🛵 Gestionar Repartidores',
                '📈 Gestionar Reportes',
                '🚪 Salir'
            ]
        }
    ]);

    switch (opcion) {
        case '📦 Realizar nuevo Pedido':
            await realizarPedido(db, client);
            break;
        case '🍕 Gestionar Pizzas':
            await gestionarPizzas(db);
            break;
        case '🧀 Gestionar Ingredientes':
            await gestionarIngredientes(db);
            break;
        case '👤 Gestionar Clientes':
            await gestionarClientes(db);
            break;
        case '🛵 Gestionar Repartidores':
            await gestionarRepartidores(db);
            break;
        case '📈 Gestionar Reportes':
            await gestionarReportes(db);
            break;
        case '🚪 Salir':
            console.log('\n👋 ¡Gracias por usar Pizza y Punto!\n');
            process.exit(0);
    }

    // 👇 Volver al menú principal después de cada acción
    await inquirer.prompt([{ type: 'input', name: 'continuar', message: '\nPresiona ENTER para volver al menú principal...' }]);
    await mostrarMenuPrincipal();
}

(async () => {
    const conexion = await connectDB();
    db = conexion.db;
    client = conexion.client;

    await mostrarMenuPrincipal();
})();
