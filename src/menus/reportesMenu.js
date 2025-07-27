const inquirer = require('inquirer');
const chalk = require('chalk');
const {
    ingredientesMasUsados,
    promedioPreciosPorCategoria,
    categoriaMasVendida
} = require('../services/reportesServices.js');

async function gestionarReportes(db) {
    let salir = false;

    while (!salir) {
        console.clear();
        console.log(chalk.greenBright('\n📊 Gestión de Reportes'));
        console.log(chalk.gray('────────────────────────────────────────────\n'));

        const { opcion } = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcion',
                message: chalk.cyan('📋 Elige un reporte para visualizar:'),
                choices: [
                    '📌 Ingredientes más usados (último mes)',
                    '📊 Promedio de precios por categoría',
                    '🔥 Categoría de pizzas más vendida',
                    '⬅️ Volver al menú principal'
                ]
            }
        ]);

        switch (opcion) {
            case '📌 Ingredientes más usados (último mes)':
                await ingredientesMasUsados(db);
                break;
            case '📊 Promedio de precios por categoría':
                await promedioPreciosPorCategoria(db);
                break;
            case '🔥 Categoría de pizzas más vendida':
                await categoriaMasVendida(db);
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

module.exports = gestionarReportes;
