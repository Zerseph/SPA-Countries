const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
      validate: {
        len: { //Verifica la longitud de una cadena.
          args: [3, 3], // Requiere exactamente 3 caracteres
          msg: 'ID must be exactly 3 letters.'
        },
        isAlpha: { //Verifica si una cadena contiene solo letras
          msg: 'ID must only contain letters.'
        }
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    imgFlag: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subRegion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.INTEGER,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

  }, {
    timestamps: false
  }
  );
};