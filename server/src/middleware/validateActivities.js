// middleware/validateActivities.js
const validateCreateActivityParams = (req, res, next) => {
    try {
        // Desestructurar los datos de la actividad desde el cuerpo de la solicitud
        const { name, difficulty, duration, season, countries } = req.body;

        // Verificar que todos los campos requeridos estén presentes
        if (!name || !difficulty || !duration || !season || !countries || countries.length === 0) {
            throw new Error('All fields (name, difficulty, duration, season, countries) are required.');
        }

        // Verificar que la dificultad esté en el rango correcto
        const validDifficultyValues = ['1', '2', '3', '4', '5'];
        if (!validDifficultyValues.includes(difficulty)) {
            throw new Error('Invalid difficulty value. Should be between 1 and 5.');
        }

        // Verificar que la duración sea un número positivo
        if (isNaN(duration) || duration <= 0) {
            throw new Error('Invalid duration value. Should be a positive number.');
        }

        // Verificar que la temporada sea una de las opciones permitidas
        const validSeasonValues = ['Summer', 'Autumn', 'Winter', 'Spring'];
        if (!validSeasonValues.includes(season)) {
            throw new Error('Invalid season value. Should be Summer, Autumn, Winter, or Spring.');
        }

        // Verificar que la lista de países sea un array de strings
        if (!Array.isArray(countries) || countries.some(country => typeof country !== 'string')) {
            throw new Error('Invalid countries value. Should be an array of strings.');
        }

        // Pasar al siguiente middleware si todas las validaciones son exitosas
        next();
    } catch (error) {
        // Manejar errores y enviar una respuesta de error al cliente
        res.status(400).send(error.message);
    }
};

module.exports = {
    validateCreateActivityParams,
};
