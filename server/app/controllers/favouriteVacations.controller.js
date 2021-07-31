const db = require("../models");
const fs = require("fs");
const FavoriteVacations = db.favoriteVacations;

/**
 * add vacation to favorites by userId
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.addVacationToFavorites = async (req, res) => {
    try {
        await FavoriteVacations.create(req.body).then(result => {
            res.status(200).send(result);
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};

/**
 * Delete vacation from favorites by userId and vacationId
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.deleteVacationFromFavourites = async (req, res) => {
    console.log(req.body);
    try {
        await FavoriteVacations.destroy({
            where: {
                vacationId: req.body.vacationId,
                userId: req.body.userId
            }
        }).then(result => {
            res.status(200).send(JSON.stringify(result));
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(JSON.stringify(e));

    }
};

exports.getFavouriteVacationsByUserIDsorted = async (req, res) => {
    let reqB = req.query;

    try {
        let stmt = `with Q as (
    select v.*,
           case
               when fv.vacationId is null then 1
               else 0
               end as sortOrder,
           case
               when fv.vacationId is null then 0
               else 1
               end as liked
    from vacations v
             left outer join favorite_vacations fv on v.id = fv.vacationId and fv.userId = ${reqB.userId}
)

select *
from Q
order by sortOrder, id;`;

        let result = await db.sequelize.query(stmt)

        /**
         * Assign 'filename' key and value to the result from server
         */

        result.forEach((v, index) => {
            let fileName = v[index].filename;
            if (fileName !== undefined && fileName !== '' && fs.existsSync(fileName)) {
                try {
                    v[index].filename = fileName
                } catch (err) {
                    console.log("found error")
                    console.error(err);
                }
            }
        });

        res.status(200).send(result[0]);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};
