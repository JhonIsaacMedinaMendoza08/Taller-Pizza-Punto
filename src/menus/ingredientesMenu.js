const inquirer = require('inquirer');
const {
    registrarNuevoIngrediente,
    mostrarIngredientes,
    editarIngrediente,
    eliminarIngrediente
} = require('../services/ingredienteService');

async function gestionarIngredientes(db) {
    let salir = false;

    while (!salir) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcion',
                message: '🧂 Gestión de Ingredientes - Elige una opción:',
                choices: [
                    'Registrar nuevo ingrediente',
                    'Ver ingredientes',
                    'Editar ingrediente',
                    'Eliminar ingrediente',
                    '⬅️ Volver al menú principal'
                ]
            }
        ]);

        switch (opcion) {
            case 'Registrar nuevo ingrediente':
                await registrarNuevoIngrediente(db);
                break;
            case 'Ver ingredientes':
                await mostrarIngredientes(db);
                break;
            case 'Editar ingrediente':
                await editarIngrediente(db);
                break;
            case 'Eliminar ingrediente':
                await eliminarIngrediente(db);
                break;
            case '⬅️ Volver al menú principal':
                salir = true;
                break;
        }
    }
}

module.exports = gestionarIngredientes;
