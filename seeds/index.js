const sequelize = require("../config/connection").default;
const seedFood = require("./food-seeds");
const seedSteps = require("./steps-seeds");
const seedWater = require("./water-seeds");
const seedUser = require("./user-seeds");

const seedAll = async () => {
  await sequelize.sync({ forces: true });

  await seedUser();

  await seedFood();

  await seedSteps();

  await seedWater();

  process.exit(0);
};

seedAll();
