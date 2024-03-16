// Importaciones de módulos y archivos necesarios
const express = require('express'); // Framework web para Node.js
const router = require('./routes/index.js'); // Rutas de la aplicación
const morgan = require('morgan'); // Middleware para registro de solicitudes HTTP
const cors = require("cors");
// const { saveCountriesToDB } = require('./helpers/fetchCountries.js'); // Función para cargar países en la base de datos
// Crear una instancia de Express
const server = express();

// Asignar un nombre a la aplicación
server.name = 'API-COUNTRIES';


// Configuración de middlewares
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());


// saveCountriesToDB(); 


// Asignar las rutas a router (routes/index.js)
server.use('/', router);

// Middleware de manejo de errores
server.use((err, req, res, next) => {
  // Determinar el código de estado y el mensaje de error
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err); // Imprimir el error en la consola
  res.status(status).send(message); // Enviar una respuesta con el código de estado y el mensaje de error
});

// Exportar la instancia de Express (la aplicación)
module.exports = server;
