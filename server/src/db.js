require('dotenv').config();

// Importación de Sequelize y módulos relacionados
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Extracción de variables de entorno relacionadas con la base de datos
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, NODE_ENV,
  DB_USER_MODEL_TEST, DB_PASSWORD_MODEL_TEST, DB_HOST_MODEL_TEST, DB_NAME_MODEL_TEST, DATABASE_URL
} = process.env;

// Determina qué configuración de base de datos utilizar según el entorno
const config = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgresql',
    logging: false, // deshabilitar impresion de consultas sql
    native: false   // usar pg-native para mejorar rendimiento de la conexion a la db
  },
  model_test: {
    username: DB_USER_MODEL_TEST,
    password: DB_PASSWORD_MODEL_TEST,
    database: DB_NAME_MODEL_TEST,
    host: DB_HOST_MODEL_TEST,
    dialect: 'postgresql',
    logging: false,
    native: false
  }
}

[NODE_ENV || 'development'];


// Configuración de la conexión a la base de datos con Sequelize
const sequelize = new Sequelize(config);


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


// Obtención del nombre del archivo actual
const basename = path.basename(__filename);

// Inicialización de un array para almacenar definiciones de modelos
const modelDefiners = [];

// Lectura de archivos en el directorio 'models' y carga de definiciones de modelos en el array
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Aplicación de cada definición de modelo en la instancia de Sequelize
modelDefiners.forEach(model => model(sequelize));

// Conversión de los nombres de modelos a formato capitalizado
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Desestructuración de los modelos
const { Country, Activity } = sequelize.models;

// Relacion muchos a muchos entre Country y Activity
Activity.belongsToMany(Country, {
  through: "CountryActivity"
});

Country.belongsToMany(Activity, {
  through: "CountryActivity"
});


// Exportación de modelos y la conexión para su uso en otros archivos
module.exports = {
  ...sequelize.models, // Permite importar modelos individualmente
  conn: sequelize,     // Permite importar la conexión directamente
};
