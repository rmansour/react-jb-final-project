const vacationsController = require('../controllers/vacations.controller');
const multer = require("multer");
const express = require("express");

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please only upload images.", false);
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'resources/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, (Date.now()) + "-" + file.originalname);
    }
});

const upload = multer({storage: storage, fileFilter: imageFilter});

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.use(express.static('resources/uploads/'));
    app.get("/vacations/getVacations", vacationsController.getVacations);
    app.post('/vacations/upsertVacation', upload.single('fileUpld'), vacationsController.upsertVacation);
    app.post("/vacations/updateVacationFollowers", vacationsController.updateVacationFollowers);
    app.post("/vacations/deleteVacation", vacationsController.deleteVacation);

};
