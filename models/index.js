const User = require("./User.js");
const Food = require("./Food.js");
const Steps = require("./Steps.js");
const Water = require("./Water.js");

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
