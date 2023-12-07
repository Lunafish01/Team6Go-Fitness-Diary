const User = require("./user");
const Food = require("./food");
<<<<<<< HEAD
const Water = require("./Water");
const Steps = require("./Steps");
=======
const Water = require("./water");
const Steps = require("./steps");
>>>>>>> 15340b2c439cf328d909799e0099c3b6befca4ba

User.hasMany(Steps, {
  foreignKey: "user_id",
});

User.hasMany(Food, {
  foreignKey: "user_id",
});

User.hasMany(Water, {
  foreignKey: "user_id",
});

Steps.belongsTo(User, {
  foreignKey: "user_id",
});

Food.belongsTo(User, {
  foreignKey: "user_id",
});

Water.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { Steps, Food, Water, User };
