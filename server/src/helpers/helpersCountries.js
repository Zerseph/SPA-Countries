require('dotenv').config();
const axios = require('axios');
const { Country } = require('../db');


// Obtener todas las Countries de la Api
// Función para obtener solo los datos que necesitas de cada país

const formatApiData = (apiCountryData) => {
  return {
    id: apiCountryData.cca3,
    name: apiCountryData.name.common || 'No name',
    imgFlag: apiCountryData.flags.png || 'No flag',
    continent: apiCountryData.continents[0] || 'No continent',
    capital: apiCountryData.capital?.[0] || 'No capital',
    subRegion: apiCountryData.subregion || 'No subRegion',
    area: apiCountryData.area  || 0, //que reciba decimales
    population: apiCountryData.population || 0,
  }
}

// Función para guardar los datos de cada país en la base de datos
const loadCountriesInDb = async () => {
  try {
    // Hacer la solicitud a la API externa
    const response = await axios.get("http://localhost:5000/countries");

    // Obtener la lista de países desde la respuesta
    const countriesData = response.data;

    // Mapear los datos de cada país utilizando la función addFormatCountryData
    const transformedCountriesApi = countriesData.map((apiCountryData) => formatApiData(apiCountryData));

    // Obtener todos los países existentes en la base de datos
    const listCountriesDb = await Country.findAll();

    // Filtrar los países nuevos que no existen en la base de datos
    const newCountries = transformedCountriesApi.filter((countryApi) => {
      return !listCountriesDb.find((countryDb) => countryDb.id === countryApi.id);
    });

    // Crear registros para los nuevos países en la base de datos
    await Country.bulkCreate(newCountries);

    // Imprimir en la consola la cantidad de nuevos países que se guardarán en la base de datos
    console.log(`${newCountries.length} countries will be saved in the database`);
  } catch (error) {
    // Manejar errores en caso de que ocurran durante el proceso
    console.error('Error saving countries to database:', error);
  }
}
module.exports = { loadCountriesInDb };