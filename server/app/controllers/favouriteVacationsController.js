const db = require("../models");
const FavoriteVacations = db.favoriteVacations;
const Vacations = db.vacations;

exports.getFavouriteVacations = async (req, res) => {
    try {
        await FavoriteVacations.findAll().then(vacations => {
            res.status(200).send(vacations);
        })
    } catch (e) {
        console.log(e);
        res.status(404).send(e);
    }
};

exports.getFavouriteVacationsByUserID = async (req, res) => {
    // console.log(req.query);
    try {
        let favorites = await FavoriteVacations.findAll({
            where: {
                userId: req.query.userId
            }
        });
        // console.log(favorites);
        res.status(200).send(favorites);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};


exports.getVacationsWithFollowedStatus = async (req, res) => {
    try {
        await FavoriteVacations.findAll({
            include: {
                model: Vacations
            }
        }).then(vacations => {
            res.status(200).send(vacations);
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};

exports.addVacationToFavorites = async (req, res) => {
    // console.log(req.body);

    // const addVacation = FavoriteVacations.create(req.body);
    // console.log(addVacation.dataValues);
    // const allFavouriteVacations = await FavoriteVacations.findAll({where: {userId: req.body.userId}}, {query: {raw: true}});
    //
    // console.log(req.body)
    // let foundMatching = false;
    // allFavouriteVacations.map(async item => {
    //     if (item.dataValues.userId === req.body.userId && item.dataValues.vacationId === req.body.vacationId) {
    //         console.log('found matching: ', item.dataValues);
    //         res.status(500).send("Found matching vacations in the favorite_vacations table: ", item.dataValues).then(response => {
    //             console.log(response)
    //         });
    //     } else
    //         FavoriteVacations.create(req.body)
    // })

    // console.log(req.body);

    try {
        await FavoriteVacations.create(req.body).then(result => {
            res.status(200).send(result);
        })
    } catch (e) {
        console.log(e);
        res.status(404).send(e);
    }

}

exports.deleteVacationFromFavourites = async (req, res) => {
    // console.log(req.body);
    try {
        await FavoriteVacations.destroy({where: {vacationId: req.body.vacationId}}).then(result => {
            res.status(200).send(JSON.stringify(result));
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(JSON.stringify(e));

    }
};

exports.getFavouriteVacationsByUserIDsorted = async (req, res) => {

    // console.log(req.query);

    let reqB = req.query;

    try {
        let stmt = `with Q as (
            select v.*,
                   case
                       when fv.vacationId is null then 1
                       else 0
                   end as sortOrder
            from vacations v
                  left outer join favorite_vacations fv on v.id = fv.vacationId and fv.userId = ${reqB.userId}
        )

        select * from Q
        order by sortOrder, id;`;

        let result = await db.sequelize.query(stmt);
        // console.log(result);
        res.status(200).send(result[0]);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}
