const router = require("express").Router();
const { food, steps, user, water } = require("../../models");

//GET request retrieving data about all users
router.get("/", async (req, res) => {
  try {
    const dbUserdata = await user.findAll({
      attributes: { exclude: ["password"] },
    });
    console.log('Data retrival successful');

    res.json(bdUserdata);
  } catch (err) {
    console.error('Error', err);
    res.status(500).json(err);
  }
});


