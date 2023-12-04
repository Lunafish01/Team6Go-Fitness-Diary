const { User } = require('../models');

const userData = [
    {
        username: "SanMiguelerica", 
        password: "password1", 
    },
    {
        username: "Lunajosh", 
        password: "password2", 
    },
    {
        username: "Calvariomaribel", 
        password: "password3", 
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;