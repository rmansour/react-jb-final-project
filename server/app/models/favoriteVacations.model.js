module.exports = (sequelize, Sequelize) => {
    const favoriteVacations = sequelize.define("favorite_vacations", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        vacationId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        userID: {
            type: Sequelize.INTEGER,
            allowNull: false

        }
    });
    return favoriteVacations;
}
