const db = require("../models");
const Vacations = db.vacations;
const User = db.user;
// const FavouriteVacations = db.favoriteVacations;

exports.getVacations = async (req, res) => {
    try {
        await Vacations.findAll().then(vacations => {
            // console.log(vacations);
            res.status(200).send(vacations);
        })
    } catch (e) {
        res.status(404).send(e);
    }
};

exports.getVacationByVacationID = async (req, res) => {
    console.log(req.query);
    try {
        let VacationsById = await Vacations.findAll({
            where: {
                vacationID: req.query.vacationId
            },
            raw: true
        });

        let users = await User.findAll({
            raw: true
        });

        // let obj = [];
        // for (let item in favorites) {
        //     if (favorites[item].id === VacationsById[0].id) {
        //         obj.push(favorites[item]);
        //     }
        // }

        console.log(users);
        // VacationsById[0]['favorites'] = obj;
        // console.log(VacationsById);
        // res.status(200).send(VacationsById);
    } catch (e) {
        console.log(e);
        res.status(404).send(e);
    }
};

exports.updateVacationFollowers = async (req, res) => {
    console.log(req.body);

    try {
        await Vacations.update(
            {followers: req.body.followers},
            {where: {vacationId: req.body.id}}
        ).then(result => {
            res.status(200).send(result);
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(e);

    }
};

exports.updateVacationAdmin = async (req, res) => {
    console.log(req.body);

    let values = {
        vacationId: req.body.id,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        price: Number(req.body.price)
    }
    let whereCondition = {where: {id: req.body.id}};
    let options = {multi: true}

    try {
        await Vacations.update(values, whereCondition, options).then(result => {
            res.status(200).send(result);
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(e);

    }
};

exports.deleteVacation = async (req, res) => {
    console.log(req.body);

    let reqBody = req.body;

    try {
        await Vacations.destroy({where: {vacationId: reqBody.id}}).then(result => {
            res.status(200).send(JSON.stringify(result));
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(JSON.stringify(e));

    }

}
