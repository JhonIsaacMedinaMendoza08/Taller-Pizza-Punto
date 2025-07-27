const inquirer = require("inquirer");
const { crearPizza, obtenerPizzas } = require("../models/pizzaModel");
const { obtenerIngredientes } = require("../models/ingredienteModel");

async function registrarNuevaPizza(db) {
    const ingredientesDisponibles = await obtenerIngredientes(db);

    if (ingredientesDisponibles.length === 0) {
        console.log(
            "❌ No hay ingredientes disponibles. Registra ingredientes primero."
        );
        return;
    }

    const respuestas = await inquirer.prompt([
        {
            type: "input",
            name: "nombre",
            message: "🍕 Nombre de la pizza:",
        },
        {
            type: "list",
            name: "categoria",
            message: "📂 Categoría de la pizza:",
            choices: ["tradicional", "especial", "vegana", "infantil"],
        },
        {
            type: "number",
            name: "precio",
            message: "💰 Precio de la pizza:",
        },
        {
            type: "checkbox",
            name: "ingredientes",
            message: "🧀 Selecciona los ingredientes:",
            choices: ingredientesDisponibles.map((i) => i.nombre),
        },
    ]);

    const nuevaPizza = {
        nombre: respuestas.nombre,
        categoria: respuestas.categoria,
        precio: respuestas.precio,
        ingredientes: respuestas.ingredientes,
    };

    const id = await crearPizza(db, nuevaPizza);
    console.log(`✅ Pizza creada con ID: ${id}`);
}

async function listarPizzas(db) {
    const pizzas = await obtenerPizzas(db);
    console.log("\n📋 Lista de pizzas registradas:\n");
    pizzas.forEach((pizza) => {
        console.log(
            `🍕 ${pizza.nombre} - ${pizza.categoria} - $${pizza.precio.toFixed(2)}`
        );
        console.log(`   Ingredientes: ${pizza.ingredientes.join(", ")}\n`);
    });
}

module.exports = {
    registrarNuevaPizza,
    listarPizzas,
};
