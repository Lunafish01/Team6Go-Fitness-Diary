const router = require("express").Router();
const { food, steps, user, water } = require("../../models");

//GET request retrieving data about all users
router.get("/", async (req, res) => {
  try {
    const dbUserdata = await user.findAll({
      attributes: { exclude: ["password"] },
    });
    console.log("Data retrival successful");

    res.json(bdUserdata);
  } catch (err) {
    console.error("Error", err);
    res.status(500).json(err);
  }
});

//Get request retriving specific user data by users id
router.get("/:id", async (req, res) => {
  try {
    const dbUserdata = await user.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: food,
          attributes: ["id", "food_name", "serving_amount", "calorie_count"],
        },
        {
          model: water,
          attributes: ["id", "date", "dauliy_goal", "actual_intake"],
        },
        {
          model: steps,
          attributes: [
            "id",
            "step_count",
            "calories_burned",
            "distance_travelled",
          ],
          include: {
            model: water,
            attributes: ["date"],
          },
        },
      ],
    });
    if (!dbUserdata) {
      res.status(404).json({ message: "User not found!" });
      return;
    }
    res.json(dbUserdata);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
