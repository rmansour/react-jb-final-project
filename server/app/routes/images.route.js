const multer = require("multer");
const imageController = require('../controllers/images.controller');

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please only upload images.", false);
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './resources/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, (Date.now()) + "-" + file.originalname);
    }
});

const upload = multer({storage: storage, fileFilter: imageFilter});

module.exports = function (app) {

    app.post('/imageUpload/saveImageInfoToDB', upload.single('fileUpld'), imageController.saveImageInfoToDB);
}
