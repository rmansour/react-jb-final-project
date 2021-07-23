module.exports = (sequelize, Sequelize, db) => {
    const favoriteVacations = sequelize.define("favorite_vacations", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    });
    return favoriteVacations;
}
