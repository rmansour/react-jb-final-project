const db = require("../models");
const Vacations = db.vacations;

exports.getVacations = async (req, res) => {
    try {
        await Vacations.findAll().then(vacations => {
            // console.log(vacations);
            res.status(200).send(vacations);
        });
    } catch (e) {
        res.status(404).send(e);
    }
};

exports.addVacation = async (req, res) => {
    let reqB = req.body;
    // console.log(reqB);

    try {
        await Vacations.create(reqB).then(result => {
            res.status(200).send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(200);
    }
}
exports.updateVacationFollowers = async (req, res) => {
    // console.log(req.body);

    try {
        await Vacations.update(
            {followers: req.body.followers},
            {where: {id: req.body.id}}
        ).then(result => {
            res.status(200).send(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);

    }
};

exports.updateVacationAdmin = async (req, res) => {
    // console.log(req.body);

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
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);

    }
};

exports.deleteVacation = async (req, res) => {
    // console.log(req.body);

    let reqBody = req.body;

    try {
        await Vacations.destroy({where: {id: reqBody.id}}).then(result => {
            res.status(200).send(JSON.stringify(result));
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(JSON.stringify(e));

    }

}
