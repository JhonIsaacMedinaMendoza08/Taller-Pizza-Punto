const inquirer = require('inquirer');
const { crearIngrediente, obtenerIngredientes, actualizarStockIngrediente } = require("../models/ingredienteModel");

async function registrarNuevoIngrediente(db) {
    const respuestas = await inquirer.prompt([
        {
            type: "input",
            name: "nombre",
            message: "🧀 Nombre del ingrediente:",
        },
        {
            type: "number",
            name: "stock",
            message: "📦 Stock del ingrediente:",
        },
        {
            type: "list",
            name: "tipo",
            message: "Tipo de ingrediente: ",
            choices: ["Salsas", "Quesos", "Toppings Cárnicos", "Toppings Vegetales", "Extras"],

        }
    ]);

    const ingrediente = {
        nombre: respuestas.nombre,
        stock: respuestas.stock,
        tipo: respuestas.tipo,
    };

    await crearIngrediente(db, ingrediente);
    console.log(`✅ Ingrediente creado con éxito: ${ingrediente.nombre}`);
}

async function mostrarIngredientes(db) {
    const ingredientes = await obtenerIngredientes(db);
    console.log('\n📋 Lista de ingredientes:\n');
    ingredientes.forEach(i => {
        console.log(`🧂 ${i.nombre} (${i.tipo}) - Stock: ${i.stock}`);
    });
    console.log('');
}

async function editarIngrediente(db) {
    const ingredientes = await obtenerIngredientes(db);
    if (ingredientes.length === 0) {
        console.log("❌ No hay ingredientes disponibles.");
        return;
    }

    const { nombreSeleccionado } = await inquirer.prompt([
        {
            type: 'list',
            name: 'nombreSeleccionado',
            message: '✏️ ¿Cuál ingrediente deseas editar?',
            choices: ingredientes.map(i => i.nombre)
        }
    ]);

    const { nuevoStock } = await inquirer.prompt([
        {
            type: 'number',
            name: 'nuevoStock',
            message: `📦 Nuevo stock para "${nombreSeleccionado}":`
        }
    ]);

    await actualizarStockIngrediente(db, nombreSeleccionado, -999999); // reset a cero
    await actualizarStockIngrediente(db, nombreSeleccionado, nuevoStock); // set nuevo stock
    console.log('✅ Stock actualizado.');
}

async function eliminarIngrediente(db) {
    const ingredientes = await obtenerIngredientes(db);
    if (ingredientes.length === 0) {
        console.log("❌ No hay ingredientes disponibles.");
        return;
    }

    const { nombreSeleccionado } = await inquirer.prompt([
        {
            type: 'list',
            name: 'nombreSeleccionado',
            message: '🗑️ ¿Cuál ingrediente deseas eliminar?',
            choices: ingredientes.map(i => i.nombre)
        }
    ]);
    const confirmacion = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmar',
            message: `¿Estás seguro de eliminar "${nombreSeleccionado}"?`,
            default: false
        }
    ]);

    if (confirmacion.confirmar) {
        await db.collection('ingredientes').deleteOne({ nombre: nombreSeleccionado });
        console.log('🗑️ Ingrediente eliminado con éxito.');
    } else {
        console.log('❌ Operación cancelada.');
    }
}

module.exports = {
    registrarNuevoIngrediente,
    mostrarIngredientes,
    editarIngrediente,
    eliminarIngrediente
};