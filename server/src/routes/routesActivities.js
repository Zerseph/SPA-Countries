// routes/routesActivities.js
const { Router } = require('express');
const { createActivityHandlers, getAllActivitiesHandlers } = require('../handlers/handlersActivities');
const { validateCreateActivityParams } = require('../middleware/validateActivities');

const routesActivities = Router();

// Ruta para crear una nueva actividad con validación
// http://localhost:3001/activities/create
/*
{
  "name": "Exciting Adventure",
  "difficulty": "3",
  "duration": 120,
  "season": "Summer",
  "countries": ["USA", "CAN", "AUS"]
}
*/
routesActivities.post('/', validateCreateActivityParams, createActivityHandlers);

routesActivities.get('/', getAllActivitiesHandlers);

module.exports = routesActivities;
