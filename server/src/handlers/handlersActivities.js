const {createActivity, getAllActivities} = require ('../controllers/controllersActivities')

module.exports = {
    createActivityHandlers : async (req, res, next) => {
        await createActivity(req, res, next);
      },
      getAllActivitiesHandlers : async (req, res, next) => {
        await getAllActivities(req, res, next);
      }
}