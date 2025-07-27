const inquirer = require('inquirer');
const {
    registrarRepartidor,
    mostrarRepartidores,
    editarEstadoRepartidor,
    eliminarRepartidor
} = require('../services/repartidorService');

async function gestionarRepartidores(db) {
    let salir = false;

    while (!salir) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcion',
                message: '🛵 Gestión de Repartidores - Elige una opción:',
                choices: [
                    'Registrar nuevo repartidor',
                    'Ver repartidores',
                    'Editar estado del repartidor',
                    'Eliminar repartidor',
                    '⬅️ Volver al menú principal'
                ]
            }
        ]);

        switch (opcion) {
            case 'Registrar nuevo repartidor':
                await registrarRepartidor(db);
                break;
            case 'Ver repartidores':
                await mostrarRepartidores(db);
                break;
            case 'Editar estado del repartidor':
                await editarEstadoRepartidor(db);
                break;
            case 'Eliminar repartidor':
                await eliminarRepartidor(db);
                break;
            case '⬅️ Volver al menú principal':
                salir = true;
                break;
        }
    }
}

module.exports = gestionarRepartidores;
