const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class water extends Model {}


water.init(
  {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoincrement: true,
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
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: dataTypes.NOW,
  },
  daily_goal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoincrement: true,
  },
  actul_intake: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoincrement: true,
  },
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'water',
}
);

});


module.exports = water;
