const db = require("../models");
const fs = require("fs");
const Image = db.images;

const saveImageInfoToDB = async (req, res) => {
    try {
        console.log('req.body', req.body);
        console.log('req.file', req.file);

        const vacationId = req.body.vacationId;
        if (req.file === undefined) {
            return res.status(500).send(`Server was unable to save file.`);
        }
        let fileForDeletion = '';

        let vacationImageInfo = Image.findOne(
            {where: {vacationId: vacationId}},
            {query: {raw: true}}
        )
            .then(response => {
                console.log('response', response);

                if (response === null) {
                    Image.create({
                        vacationId: vacationId,
                        type: req.file.mimetype,
                        filename: req.file.filename
                    }).then(() => {
                        res.status(200).send("Image uploaded successfully!");
                    }).catch(err => {
                        console.log(err);
                        res.status(500).send("Couldn't upload image! insert");
                    })
                } else {
                    console.log(response.dataValues);
                    fileForDeletion = response.dataValues.filename
                    console.log('fileForDeletion', fileForDeletion);
                    Image.update({
                            vacationId: vacationId,
                            type: req.file.mimetype,
                            filename: req.file.filename
                        },
                        {where: {vacationId: req.body.vacationId}}
                    ).then(() => {
                        fs.unlink(`./resources/uploads/${fileForDeletion}`, (err) => {
                            if (err) throw err;
                            console.log(`successfully deleted uploads/${fileForDeletion}`);
                        });
                        res.status(200).send("Updated image in the table.");
                    }).catch(err => {
                        console.log(err);
                        res.status(500).send("Couldn't update image! update");
                    });
                }
            })

    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
};
module.exports = {
    saveImageInfoToDB,
};
