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
        res.status(404).send(e);
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

exports.upsertVacation = async (req, res) => {
    try {
        console.log('req.body', req.body);
        console.log('req.file', req.file);

        let vacationId = req.body.vacationId;

        console.log(vacationId);

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
                console.log('insert');
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
                console.log(response.dataValues);
                fileForDeletion = response.dataValues.filename;
                console.log('fileForDeletion', fileForDeletion);
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

//
// exports.updateVacationAdmin = async (req, res) => {
//     // console.log(req.body);
//
//     let values = {
//         vacationId: req.body.id,
//         destination: req.body.destination,
//         src: req.body.src,
//         description: req.body.description,
//         start_date: req.body.start_date,
//         end_date: req.body.end_date,
//         price: Number(req.body.price)
//     }
//     let whereCondition = {where: {id: req.body.id}};
//     let options = {multi: true}
//
//     try {
//         await Vacations.update(values, whereCondition, options).then(result => {
//             res.status(200).send(result);
//         });
//     } catch (e) {
//         console.log(e);
//         res.status(500).send(e);
//
//     }
// };

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
