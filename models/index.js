const User = require("./user");
const Food = require("./food");
const Steps = require("./steps");
const Water = require("./water");

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
