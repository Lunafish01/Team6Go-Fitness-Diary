const { food } = require('../models/food');

const foodData = [
    {
        user_id: 1,
        food_name: 'Carne Guisada Tacos',
        serving_amount: 2,
        calorie_count: 520
    },
    {
        user_id: 2,
        food_name: 'Green Goddess Salad',
        serving_amount: 1,
        calorie_count: 550
    },
    {
        user_id: 3,
        food_name: 'Chicken Parmesean',
        serving_amount: 2,
        calorie_count: 900
    },
]

const seedFood = () => food.bulkCreate(foodData);

module.exports = seedFood;
