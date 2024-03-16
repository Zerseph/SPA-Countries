const axios = require("axios");
const server = require("./src/server.js");
const { conn } = require('./src/db.js');
const PORT = 3001;
const { loadCountriesInDb } = require('./src/helpers/helpersCountries.js'); // Función para cargar países en la base de datos

const startServer = async () => {
  try {
    await conn.sync({ alter: true });
    console.log('Database modeling ready');

    await loadCountriesInDb();
    console.log("Countries loaded correctly");

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();