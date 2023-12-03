const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection").default;

class Steps extends Model {}

Steps.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    step_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    calories_burned: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    distance_travelled: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "steps",
  }
);

module.exports = Steps;
