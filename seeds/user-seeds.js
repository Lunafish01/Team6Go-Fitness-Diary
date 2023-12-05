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

const seedUser = async () => { 
    await User.bulkCreate(userData, {individualHooks: true });
};

module.exports = seedUser;