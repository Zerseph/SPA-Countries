const { Router } = require('express');
const { getAllCountriesHandler, searchNameCountryHandler, searchIdCountryHandler } = require('../handlers/handlersCountries');
const { validateSearchNameCountry, validateSearchIdCountry } = require('../middleware/validateCountries');

const routesCountries = Router();

//obtener todos los paises
///http://localhost:3001/countries/
routesCountries.get('/', getAllCountriesHandler);

// Definimos la ruta para buscar países por nombre
///http://localhost:3001/countries/?name=aruba
routesCountries.get('/name', validateSearchNameCountry, searchNameCountryHandler);

// Ruta para visualizar la información de un país por ID
///http://localhost:3001/countries/ARG
routesCountries.get('/:idPais', validateSearchIdCountry, searchIdCountryHandler);


module.exports = routesCountries;



