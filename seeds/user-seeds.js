const { User } = require('../models');

const userData = [
    {
        username: "SanMiguelerica", 
        email: "sanmiguel@yahoo.com",
        password: "password1", 
    },
    {
        username: "Lunajosh", 
        email: "lunajosh@gmail.com",
        password: "password2", 
    },
    {
        username: "Calvariomaribel",
        email: "calvariomari@outlook.com", 
        password: "password3", 
    },
];

const seedUser = async () => { 
    await User.bulkCreate(userData, {individualHooks: true });
};

module.exports = seedUser;