const { steps } = require("../models/steps");

const stepsData = [
  {
    user_id: 1,
    date: "2023-08-13",
    step_count: 10518,
    calories_burned: 416,
    distance_travelled: 4.5,
  },
  {
    user_id: 2,
    date: "2023-10-10",
    step_count: 3986,
    calories_burned: 751,
    distance_travelled: 3.2,
  },
  {
    user_id: 3,
    date: "2023-12-1",
    step_count: 8946,
    calories_burned: 332.5,
    distance_travelled: 4.2,
  },
];

const seedSteps = () => steps.bulkCreate(stepsData);

module.exports = seedSteps;
