const { Op } = require('sequelize');
// Importamos el modelo Country de la base de datos
const { Country, Activity } = require('../db');


// Función para obtener todos los países con actividades incluidas
const getAllCountries = async (req, res, next) => {
    try {
        const allCountries = await Country.findAll({
            include: {
                model: Activity,
                attributes: ['id', 'name', 'difficulty', 'duration', 'season'],
                through: { attributes: [] } // Para evitar la inclusión de atributos adicionales de la tabla de unión
            }
        });

        return res.json(allCountries);
    } catch (error) {
        next(error);
    }
};


// Función para buscar países por nombre
const searchNameCountry = async (req, res, next) => {
    try {
        const { name } = req.query;

        // Verificar si se proporcionó el parámetro de consulta 'name'
        if (!name) {
            return res.status(400).json({ error: 'Query parameter "name" is required.' });
        }

        // Buscar países que coincidan con el nombre recibido, sin distinguir mayúsculas y minúsculas
        const countries = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });

        // Verificar si se encontraron países
        if (countries.length === 0) {
            return res.status(404).json({ message: 'No countries found with the provided name.' });
        }

        // Enviar la lista de países encontrados como respuesta
        res.json(countries);
    } catch (error) {
        next(error);
    }
};
////////////////////////////////////////////

// Función para visualizar la información de un país por ID
const searchIdCountry = async (req, res, next) => {
    try {
        const { idPais } = req.params;

        if (!idPais) {
            return res.status(400).json({ error: 'Parameter "idPais" is required.' });
        }

        // Buscar el país por ID en la base de datos, incluyendo las actividades turísticas asociadas
        const countryInfo = await Country.findByPk(idPais, {
            include: {
                model: Activity,
                attributes: ['id', 'name', 'difficulty', 'duration', 'season'],
                through: { attributes: [] } // Para evitar la inclusión de atributos adicionales de la tabla de unión
            }
        });

        if (!countryInfo) {
            return res.status(404).json({ error: 'Country not found.' });
        }

        return res.json(countryInfo);
    } catch (error) {
        next(error);
    }
};


module.exports = { searchNameCountry, searchIdCountry, getAllCountries };
