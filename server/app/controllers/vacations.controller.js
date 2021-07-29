const db = require("../models");
const fs = require("fs");
const Vacations = db.vacations;
const path = require("path");


exports.getVacations = async (req, res) => {
    try {
        await Vacations.findAll().then(vacations => {
            res.status(200).send(vacations);
        });
    } catch (e) {
        res.status(404).send(e);
    }
};
//
// exports.getImage = async (req, res) => {
//     try {
//         console.log(req.query);
//         Vacations.findOne({where: {id: req.query.id}}).then((response) => {
//             fs.readdir(
//                 path.resolve(__dirname, '../../resources/uploads/'),
//                 (err, files) => {
//                     if (err) throw err;
//
//                     for (let file of files) {
//                         console.log(file);
//                         if (file === response.filename)
//                             res.status(200).send(response.filename);
//                     }
//                 }
//             );
//         })
//     } catch (e) {
//         console.log(e);
//         res.status(500).send(e);
//     }
// }

exports.addVacation = async (req, res) => {
    let reqB = req.body;

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
// 1627473163175-4 - 5rqCU9Q.png
exports.upsertVacation = async (req, res) => {
    try {
        console.log('req.body', req.body);
        console.log('req.file', req.file);

        let vacationId = req.body.vacationId;
        if (vacationId === undefined || vacationId === '') {
            vacationId = -1;
        }
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
        console.log(values);

        if (req.file === undefined) {
            return res.status(500).send(`Server was unable to save file.`);
        }
        let fileForDeletion = '';


        let vacationImageInfo = Vacations.findOne(
            {where: {id: vacationId}},
            {query: {raw: true}}
        ).then(response => {
            console.log('response', response);

            if (response === null) {
                Vacations.create(values).then(() => {
                    console.log('insert')
                    res.status(200).send("Image uploaded successfully!");
                }).catch(err => {
                    console.log(err);
                    res.status(500).send("Insert: couldn't upload image!");
                })
            } else {
                console.log(response.dataValues);
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

exports.updateVacationAdmin = async (req, res) => {
    // console.log(req.body);

    let values = {
        vacationId: req.body.id,
        destination: req.body.destination,
        src: req.body.src,
        description: req.body.description,
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
