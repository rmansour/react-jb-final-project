const db = require("../models");
const FavoriteVacations = db.favoriteVacations;
const Vacations = db.vacations;
const User = db.user;

exports.getFavouriteVacations = async (req, res) => {
    try {
        await FavoriteVacations.findAll().then(vacations => {
            console.log()
            res.status(200).send(vacations);
        })
    } catch (e) {
        console.log(e);
        res.status(404).send(e);
    }
};

exports.getFavouriteVacationsByUserID = async (req, res) => {
    try {
        let favorites = await FavoriteVacations.findAll({
            where: {
                userID: req.query.userID
            }
        });
        console.log(favorites);
        res.status(200).send(favorites);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};


exports.getVacationsWithFollowedStatus = async (req, res) => {
    try {
        await FavoriteVacations.findAll({
            include: {
                model: Vacations
            }
        }).then(vacations => {
            res.status(200).send(vacations);
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};

exports.addVacationToFavorites = async (req, res) => {
    console.log(req.body);

    try {
        await FavoriteVacations.create(req.body).then(result => {
            res.status(200).send(result);
        })
    } catch (e) {
        console.log(e);
        res.status(404).send(e);
    }
}

exports.deleteVacationFromFavourites = async (req, res) => {
    console.log(req.body);
    try {
        await FavoriteVacations.destroy({where: {id: req.body.id}}).then(result => {
            res.status(200).send(JSON.stringify(result));
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(JSON.stringify(e));

    }
};

