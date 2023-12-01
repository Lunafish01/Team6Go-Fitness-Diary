const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Food extends Model {}

Food.init({
  id: {

  },
  user_id: {

  },
  food_name: { 

  },
  calorie_count: {

  },
});

module.exports = Food;
