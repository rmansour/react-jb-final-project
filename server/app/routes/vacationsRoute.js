const vacationsController = require('../controllers/vacationsController');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/vacations/getVacations", vacationsController.getVacations);

    app.post('/vacations/addVacation', vacationsController.addVacation);
    app.post("/vacations/updateVacationFollowers", vacationsController.updateVacationFollowers);
    app.post("/vacations/updateVacationAdmin", vacationsController.updateVacationAdmin);
    app.post("/vacations/deleteVacation", vacationsController.deleteVacation);

};
