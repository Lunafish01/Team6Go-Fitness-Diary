const router = require("express").Router();
const withAuth = require("../../utils/auth");
const sequelize = require("../../config/connection");
const { steps, food, water, users } = require("../../models");

//GET request to get all food entries
router.get("/", async (req, res) => {
  try {
    const dbFoodData = await food.findAll({
      attributes: ["user_id", "food_name", "serving_amount", "calorie_count"],
      order: [["created_at", "DESC"]],
      include: [
        {
          model: food,
          attributes: [
            "user_id",
            "food_name",
            "serving_amount",
            "calorie_count",
          ],
          include: {
            model: user,
            attributes: ["username"],
          },
        },
        {
          model: user,
          attributes: ["username"],
        },
      ],
    });

    res.json(dbFoodData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET request to get food entry by id
router.get("/:id", async (req, res) => {
  try {
    const dbFoodData = await food.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["user_id", "food_name", "serving_amount", "calorie_count"],
      include: [
        {
          model: user,
          attributes: ["username"],
        },
        {
          model: food,
          attributes: [
            "user_id",
            "food_name",
            "serving_amount",
            "calorie_count",
          ],
          include: {
            model: user,
            attributes: ["username"],
          },
        },
      ],
    });

    if (!dbFoodData) {
      res.status(404).json({ message: "Entry not found" });
      return;
    }
    res.json(dbFoodData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//POST request to create a new food entry
router.post("/", withAuth, async (req, res) => {
  try {
    const dbFoodData = await food.create({
      food_name: req.body.food_name,
      serving_amount: req.body.serving_amount,
      calorie_count: req.body.calorie_count,
      user_id: req.session.user_id,
    });
    res.json(dbFoodData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});
