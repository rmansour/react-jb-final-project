module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define("images", {
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false

        },
        data: {
            type: DataTypes.BLOB("long"),
            allowNull: false
        },
    });

    return Images;
};
