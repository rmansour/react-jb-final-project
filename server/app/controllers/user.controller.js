
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};


// exports.getUsers = async (req, res) => {
//     try {
//         let users = await con.execute(`SELECT * FROM users`);
//         res.send(users[0]);
//     } catch (err) {
//         res.send(err)
//     }
// }
//
//
//
// exports.getAdmin = async (req, res) => {
//     try {
//         let admin = await con.execute(`SELECT * FROM users where isAdmin = 1`);
//         res.send(admin[0]);
//     } catch (err) {
//         res.send(err)
//     }
// }

