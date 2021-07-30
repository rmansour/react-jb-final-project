const db = require("../models");
const fs = require("fs");
const Vacations = db.vacations;

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
        if (vacationId === undefined || vacationId === '') {
            vacationId = -1;
        }
        // if (req.file === undefined || req.body.filename === undefined && req.body.type === undefined || req.file === null) {
        //     return res.status(500).send(`Server was unable to save file.`);
        // }

        console.log(vacationId);

        let whereCondition = {where: {id: vacationId}};
        let options = {multi: true}
        let values = {
            destination: req.body.destination,
            description: req.body.description,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            price: req.body.price,
            type: req.file.mimetype,
            filename: req.file.filename,
        };
        // console.log(values);

        // type: req.file.mimetype ? req.file.mimetype : '',
        //     filename: req.file.filename ? req.file.filename : '',

        let fileForDeletion = '';

        //
        // destination: values.destination,
        //     description: values.description,
        //     start_date: values.start_date,
        //     end_date: values.end_date,
        //     filename: values.filename,
        //     type: values.type

        let vacationImageInfo = Vacations.findOne(
            {where: {id: vacationId}},
            {query: {raw: true}}
        ).then(response => {
            console.log('response', response);

            if (response === null) {
                Vacations.create({}).then(() => {
                    console.log('insert')
                    res.status(200).send("Image uploaded successfully!");
                }).catch(err => {
                    console.log(err);
                    res.status(500).send("Insert: couldn't upload image!");
                })
            } else {
                // console.log(response.dataValues);
                fileForDeletion = response.dataValues.filename
                console.log('fileForDeletion', fileForDeletion);
                Vacations.update(values, whereCondition, options).then(() => {
                    if (fileForDeletion !== '') {
                        try {
                            fs.unlink(`resources/uploads/${fileForDeletion}`, (err) => {
                                if (err) throw err;
                                console.log(`successfully deleted uploads/${fileForDeletion}`);
                            });
                            res.status(200).send("Updated image in the table.");

                        } catch (e) {
                            console.log('Couldn\'t delete file: ', e);
                            res.status(500).send(e);
                        }
                    }
                }).catch(err => {
                    console.log(err);
                    res.status(500).send("Update: couldn't update image!");
                });
            }
        })

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
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(JSON.stringify(e));
    }
}
