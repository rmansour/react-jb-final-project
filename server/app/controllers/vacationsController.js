const db = require("../models");
const Vacations = db.vacations;
const User = db.user;

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
        await Vacations.findOne({
            where: {
                vacationID: Number(req.query.vacationID)
            }
        }).then(vacationByID => {
            res.status(200).send(vacationByID);
        })
    } catch (e) {
        res.status(404).send(e);
    }
};

exports.getVacationByUserID = async (res, req) => {
    try {
        await Vacations.findAll({
            include: {
                model: User
            }
        })
    } catch (e) {
        res.status(404).send(e);

    }
};

// exports.getVacationsByVacationID = async (req, res) => {
//     try {
//         let stmt = `SELECT * FROM vacations where vacationID = ${req.query.id}`;
//         console.log(stmt)
//         let vacations = await con.execute(stmt);
//         res.send(vacations[0]);
//     } catch (err) {
//         res.send(err)
//     }
// }
//
// exports.getVacationsByUserID = async (req, res) => {
//     try {
//         let stmt = `select * from vacations v
//             inner join favourite_vacations fv on v.vacationID = fv.vacationID
//             inner join users u on fv.userID = u.userID
//             where u.userID = ${req.query.id}`;
//         console.log(stmt);
//         let vacationsByUserID = await con.execute(stmt);
//         res.send(vacationsByUserID[0]);
//     } catch (err) {
//         res.send(err)
//     }
// }
//
// exports.addVacation = async (req, res) => {
//     try {
//         let stmt = `insert into vacations (description, destination, src, start_date, end_date, price, followers) VALUES ('${req.body.description}','${req.body.destination}','${req.body.src}',${req.body.start_date},${req.body.end_date}, ${req.body.price}, ${req.body.followers});`
//         console.log(stmt);
//         let result = await con.execute(stmt);
//
//         res.send(result[0]);
//     } catch (e) {
//         res.send(e);
//
//     }
// }
