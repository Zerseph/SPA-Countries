const { Router } = require("express");

const routesCountries = require("./routesCountries");
const routesActivities = require("./routesActivities")

const router = Router();


//lista de gestores de rutas
router.use('/countries', routesCountries);
router.use('/activities', routesActivities);

module.exports = router;
