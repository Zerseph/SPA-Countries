// Importamos el controlador que creamos anteriormente
const { getAllCountries, searchNameCountry, searchIdCountry } = require('../controllers/controllersCountries');

module.exports = {
  getAllCountriesHandler: async (req, res, next) => {
    await getAllCountries(req, res, next);
  },
  searchNameCountryHandler: async (req, res, next) => {
    await searchNameCountry(req, res, next);
  },
  searchIdCountryHandler: async (req, res, next) => {
    await searchIdCountry(req, res, next);
  }
};
