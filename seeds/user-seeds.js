const { User } = require('../models/user');

const userData = [
    {
        username: "erica_SanMiguel", 
        password: "password1", 
    },
    {
        username: "joshua_Luna", 
        password: "password2", 
    },
    {
        username: "maribel_calvario", 
        password: "password3", 
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;