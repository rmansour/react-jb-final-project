module.exports = (sequelize, Sequelize, db) => {
    const favoriteVacations = sequelize.define("favorite_vacations", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            vacationId: {
                type: Sequelize.INTEGER,
                allowNull:false,
                unique: 'vacationId'
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: 'userId'

            },
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['userId', 'vacationId']
                }
            ]
        });
    return favoriteVacations;
}
