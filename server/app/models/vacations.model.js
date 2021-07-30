module.exports = (sequelize, Sequelize) => {
    const Vacations = sequelize.define("vacations", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(2000),
            allowNull: false,
        },
        destination: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        filename: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        start_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        end_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        followers: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    });
    return Vacations;
};
