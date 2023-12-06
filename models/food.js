const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Food extends Model {}

Food.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    food_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    serving_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    calorie_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "food",
  }
);

  module.exports = Food;
