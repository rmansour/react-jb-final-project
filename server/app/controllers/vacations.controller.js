const db = require("../models");
const fs = require("fs");
const Vacations = db.vacations;
const io = require('../../server');

exports.getVacations = async (req, res) => {
    try {
        await Vacations.findAll().then(vacations => {
            res.status(200).send(vacations);
        });
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.updateVacationFollowers = async (req, res) => {
    try {
        await Vacations.update(
            {followers: req.body.followers},
            {where: {id: req.body.id}}
        ).then(result => {
            res.status(200).send(result);
            io.emit('updateFollowers');
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};

/**
 * This function handles two situations:
 * 1. insert new vacation by admin
 * 2. update existing vacation by admin
 *
 * if vacation doesn't exist, i.e. vacationId === undefined -> create new vacation
 * else (vacationId exist) update the relevant columns from the values in the request body
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.upsertVacation = async (req, res) => {
    try {

        let vacationId = req.body.vacationId;

        let whereCondition = {where: {id: vacationId}};
        let options = {multi: true}
        let values = {
            destination: req.body.destination,
            description: req.body.description,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            price: req.body.price,
            type: req.body.type || req.file.mimetype,
            filename: req.body.filename || req.file.filename,
        };

        let fileForDeletion = '';
        if (vacationId === undefined || vacationId === '') {
            Vacations.create(values).then(() => {
                res.status(200).send("Vacation created successfully!");
                io.emit('addedVacation');
            }).catch(err => {
                console.log(err);
                res.status(500).send("Insert: couldn't create vacation!");
            })
        } else {
            Vacations.findOne(
                {where: {id: vacationId}},
                {query: {raw: true}}
            ).then(response => {
                fileForDeletion = response.dataValues.filename;
                Vacations.update(values, whereCondition, options).then((response) => {
                    if (fileForDeletion !== '') {
                        try {
                            // fs.unlink(`resources/uploads/${fileForDeletion}`, (err) => {
                            //     if (err) throw err;
                            //     console.log(`Successfully deleted uploads/${fileForDeletion}`);
                            // });
                            res.status(200).send("Updated image in the table.");
                            io.emit('updatedVacations', {id: vacationId, ...values});
                        } catch (e) {
                            console.log('Couldn\'t delete file: ', e);
                            res.status(500).send(e);
                        }
                    }
                })
            }).catch(err => {
                console.log(err);
                res.status(500).send("Update: couldn't update image!");
            });
        }
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
};

exports.deleteVacation = async (req, res) => {
    let reqBody = req.body;

    try {
        await Vacations.destroy({where: {id: reqBody.id}}).then(result => {
            res.status(200).send(JSON.stringify(result));
            io.emit('deleteVacation')
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(JSON.stringify(e));
    }
}
