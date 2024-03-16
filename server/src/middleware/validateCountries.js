const validateSearchNameCountry = (req, res, next) => {
  try {
    // Verificar si se proporcionó el parámetro de consulta 'name'
    const { name } = req.query;
    if (!name) {
      throw new Error('Query parameter "name" is required.');
    }

    // Pasar al siguiente middleware si todo está correcto
    next();
  } catch (error) {
    // Manejar errores y enviar una respuesta de error al cliente
    res.status(400).json({ error: error.message });
  }
};
//////////////////////////////////////////////////////////

const validateSearchIdCountry = (req, res, next) => {
  try {
    // Verificar si 'id' es una propiedad en req.params
    if (req.params.hasOwnProperty('idPais')) {
      // Desestructurar 'id' de req.params
      const { idPais } = req.params;

      // Verificar si la longitud de 'id' es diferente de 3
      if (idPais.length !== 3) {
        // Lanzar un error si 'id' no tiene exactamente 3 caracteres
        throw new Error('Country code must be exactly 3 letters.');
      }
    } else {
      // Lanzar un error si 'id' no es una propiedad en req.params
      throw new Error('Param idPais does not Exist');
    }

    // Pasar al siguiente middleware si todo está correcto
    next();
  } catch (error) {
    // Manejar errores y enviar una respuesta de error al cliente
    res.status(400).send(error.message);
  }
};

module.exports = {
  validateSearchNameCountry,
  validateSearchIdCountry,
}