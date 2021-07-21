const favouriteVacationsController = require('../controllers/favouriteVacationsController');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/favouriteVacation/getFavouriteVacations", favouriteVacationsController.getFavouriteVacations);
    app.get("/favouriteVacation/getVacationsWithFollowedStatus", favouriteVacationsController.getVacationsWithFollowedStatus);
    app.get("/favouriteVacation/getFavouriteVacationsByUserID", favouriteVacationsController.getFavouriteVacationsByUserID);

    app.post("/favouriteVacation/deleteVacationFromFavourites", favouriteVacationsController.deleteVacationFromFavourites);
    app.post("/favouriteVacation/addVacationToFavorites", favouriteVacationsController.addVacationToFavorites);

};
