const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/**
 * With `through`, `foreignKey`, `otherKey`, we’re gonna have a new table user_roles as connection between users and roles table via their primary key as foreign keys.
 */
db.images = require("./image.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model")(sequelize, Sequelize);
db.role = require("../models/role.model")(sequelize, Sequelize);
db.vacations = require("../models/vacations.model")(sequelize, Sequelize);
db.favoriteVacations = require("./favoriteVacations.model")(sequelize,Sequelize, db);
db.images = require("./image.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
});

db.favoriteVacations.belongsTo(db.vacations);
db.favoriteVacations.belongsTo(db.user);
db.images.belongsTo(db.vacations);
// db.user.hasMany(db.favoriteVacations);
// // db.user.hasMany(db.vacations);

db.ROLES = ["user", "admin"];

module.exports = db;

// The association between Users and Roles is Many-to-Many relationship:
//     – One User can have several Roles.
// – One Role can be taken on by many Users.
//
//     We use User.belongsToMany(Role) to indicate that the user model can belong to many Roles and vice versa.
//
//     With through, foreignKey, otherKey, we’re gonna have a new table user_roles as connection between users and roles table via their primary key as foreign keys.
//
//     If you want to know more details about how to make Many-to-Many Association with Sequelize and Node.js, please visit:
//     Sequelize Many-to-Many Association example – Node.js & MySQL (https://bezkoder.com/sequelize-associate-many-to-many/)
