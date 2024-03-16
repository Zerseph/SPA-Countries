// controllers/controllersActivities.js
const { Activity, Country } = require('../db');

const createActivity = async (req, res, next) => {
    try {
        const { name, difficulty, duration, season, countries } = req.body;

        // Crear la actividad en la base de datos
        const newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
        });

        // Buscar los países en la base de datos por su código
        const countriesInDb = await Country.findAll({
            where: {
                id: countries,
            },
        });

        // Asociar los países con la actividad
        await newActivity.setCountries(countriesInDb);

        // Enviar la nueva actividad como respuesta
        res.json(newActivity);
    } catch (error) {
        next(error);
    }
};

/////////////////////////////////

const getAllActivities = async (req, res, next) => {
    try {
        const allActivities = await Activity.findAll();
            return res.json(allActivities);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createActivity,
    getAllActivities
};
