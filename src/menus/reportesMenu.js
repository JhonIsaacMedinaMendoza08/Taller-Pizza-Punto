const inquirer = require('inquirer');
const {
    ingredientesMasUsados,
    promedioPreciosPorCategoria,
    categoriaMasVendida } = require('../services/reportesServices.js');

async function gestionarReportes(db) {
    let salir = false;

    while (!salir) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcion',
                message: '📈 Reportes disponibles:',
                choices: [
                    'Ingredientes más usados (último mes)',
                    'Promedio de precios por categoría',
                    'Categoría de pizzas más vendida',
                    '⬅️ Volver al menú principal'
                ]
            }
        ]);

        switch (opcion) {
            case 'Ingredientes más usados (último mes)':
                await ingredientesMasUsados(db);
                break;
            case 'Promedio de precios por categoría':
                await promedioPreciosPorCategoria(db);
                break;
            case 'Categoría de pizzas más vendida':
                await categoriaMasVendida(db);
                break;
            case '⬅️ Volver al menú principal':
                salir = true;
                break;
        }
    }
}

module.exports = gestionarReportes;
