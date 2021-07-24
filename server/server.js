const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const initRoutes = require("./src/routes/web");

const app = express();

const db = require('./app/models');
const Role = db.role;

var corsOptions = {
    origin: 'http://localhost:8081'
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Raed's application." });
});


// initial() function helps us to create 2 rows in database.
// In development, you may need to drop existing tables and re-sync database. So you can use force: true as code below.
// Learn how to implement Sequelize One-to-Many Relationship at: https://bezkoder.com/sequelize-associate-one-to-many/

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "admin"
    });

}
//{force:true}
//{alter:true}
db.sequelize.sync().then(() => {
    console.log('Drop and Resync Db');
    // initial();
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/vacationsRoute')(app);
require('./app/routes/favoriteVacationsRoute')(app);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
