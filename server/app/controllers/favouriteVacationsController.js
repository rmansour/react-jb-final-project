const favouriteVacations = require('../models');

exports.getFavouriteVacations = async (req, res) => {
    try {
        await favouriteVacations.findAll().then(vacations => {
            // console.log(vacations);
            res.status(200).send(vacations);
        })
    } catch (e) {
        res.status(404).send(e);
    }
};
