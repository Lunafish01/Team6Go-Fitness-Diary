const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Food, User } = require("../../models");

//GET 'api/food' request to get all food entries
router.get("/food", async (req, res) => {
  try {
    const dbFoodData = await Food.findAll({
      where: { id: req.params.id },
      attributes: ["user_id", "food_name", "serving_amount", "calorie_count"],
      order: [["created_at", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["user_id", "username"],
        },
      ],
    });

    res.json(dbFoodData);
  } catch (err) {
    console.error("Error in foodRoutes GET /:", err);
    res.status(500).json({ error: "Internal server error. Unable to fetch food data." });
  }
});

//GET request to get food entry by id
router.get("/:id", async (req, res) => {
  try {
    const dbFoodData = await Food.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["user_id", "food_name", "serving_amount", "calorie_count"],
      include: [
        {
          model: User,
          attributes: ["username"],
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
    const dbFoodData = await Food.create({
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

module.exports = router;
