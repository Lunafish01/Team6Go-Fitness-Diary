const user = require("./user");
const food = require("./food");
const steps = require("./steps");
const water = require("./water");

user.hasMany(steps, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

user.hasMany(food, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

user.hasMany(water, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

steps.belongsTo(user, {
  foreignKey: "user_id",
});

food.belongsTo(user, {
  foreignKey: "user_id",
});

water.belongsTo(user, {
  foreignKey: "user_id",
});

module.exports = { steps, food, water, user };
