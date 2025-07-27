# 🍕 Pizza y Punto

**Pizza y Punto** es una aplicación de consola desarrollada en **Node.js** con base de datos en **MongoDB Atlas**, que permite gestionar el flujo completo de una pizzería: pedidos, inventario, clientes, repartidores y reportes analíticos con Aggregation Framework.

> Proyecto del Taller - MongoDB + Node.js  
> Autor: Isaac Medina

---

## 📦 Tecnologías usadas

- Node.js
- MongoDB Atlas (con transacciones)
- Aggregation Framework
- `inquirer` (CLI interactivo)
- `dotenv`

---

## 🚀 Instalación

1. Clona este repositorio:

```bash
git https://github.com/JhonIsaacMedinaMendoza08/Taller-Pizza-Punto.git
cd Taller-Pizza-Punto
```

2. Instala dependencias:

```bash
npm install
```

3. Crea tu archivo `.env`:

```env
MONGO_URI=mongodb+srv://maestroPizza:revisapizza2025@mycluster.vlbhwms.mongodb.net/pizza_y_punto?retryWrites=true&w=majority&appName=MyCluster

```
> Crea el archivo .env y copia esta URI para conectarte a mi base de datos de pruebas en Mongo Atlas

---

## 🗂️ Estructura del proyecto

```
pizza-y-punto/
├── src/
│   ├── controllers/
│   ├── menus/
│   │   ├── clientesMenu.js
│   │   ├── ingredientesMenu.js
│   │   ├── pizzasMenu.js
│   │   ├── repartidoresMenu.js
│   │   └── reportesMenu.js
│   ├── models/
│   │   ├── clienteModel.js
│   │   ├── ingredienteModel.js
│   │   ├── pedidoModel.js
│   │   ├── pizzaModel.js
│   │   └── repartidorModel.js
│   ├── services/
│   │   ├── clienteService.js
│   │   ├── ingredienteService.js
│   │   ├── pedidoService.js
│   │   ├── pizzaService.js
│   │   ├── repartidorService.js
│   │   └── reportesServices.js
│   └── utils/
│       ├── db.js
│       └── test-connection.js
├── setup.js
├── index.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 🧑‍💻 Uso de la aplicación

Ejecuta la app con:

```bash
node index.js
```

Y verás un menú principal como:

```
📦 ¿Qué deseas hacer?
❯ Realizar nuevo Pedido
  Gestionar Pizzas
  Gestionar ingredientes
  Gestionar Clientes
  Gestionar Repartidores
  Ver reportes de ventas
  Salir
```

---

## 🔁 Transacciones implementadas

La función `realizarPedido()` garantiza la consistencia entre múltiples colecciones:

1. Verifica stock de ingredientes.
2. Resta unidades necesarias.
3. Registra el pedido.
4. Asigna repartidor disponible.
5. Todo envuelto en una **transacción MongoDB**. Si falla algo, se revierte automáticamente.

---

## 📊 Reportes con Aggregation Framework

Los siguientes reportes están disponibles:

- 🧀 Ingredientes más usados (último mes)
- 📂 Promedio de precios por categoría
- 🔥 Categoría de pizza con más ventas

---

## 🧪 Ejemplos

### Registrar pizza

1. Selecciona ingredientes desde el sistema.
2. Define nombre, precio y categoría.
3. Guarda automáticamente en MongoDB.

### Realizar pedido

1. Selecciona cliente y pizzas.
2. El sistema:
   - Verifica stock.
   - Resta ingredientes.
   - Registra pedido.
   - Asigna repartidor.

---

## ✅ Checklist de funcionalidades

- [x] Registrar y editar pizzas
- [x] Controlar stock de ingredientes
- [x] Administrar clientes y repartidores
- [x] Realizar pedidos con transacciones
- [x] Generar reportes con agregaciones
- [x] CLI interactivo usando `inquirer`

---

## 🛡️ Buenas prácticas aplicadas

- Uso de `.env` para proteger credenciales
- Modularización de código
- Separación de modelos, servicios y vistas (menús)
- Validaciones de inputs
- Commit semántico y estructura de Git

---

## 📌 Recomendaciones

- Asegúrate de que tus ingredientes tengan campos `stock` numéricos válidos.
- No olvides registrar ingredientes y repartidores antes de hacer pedidos.
- Mantén tu URI de Mongo Atlas en privado (usa `.env` y `.gitignore`).

---

## 📚 Créditos

Desarrollado por **Isaac Medina** como parte del Taller Node.JS
🚀 Gracias a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) y [Node.js](https://nodejs.org/)

---

## 🧼 .gitignore recomendado

```gitignore
node_modules/
.env
.DS_Store
```

---

## 📝 Licencia

Este proyecto es solo con fines educativos y de práctica.
