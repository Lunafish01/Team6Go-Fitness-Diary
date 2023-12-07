const sequelize = require("../config/connection");
const router = require("express").Router();
const { Steps, Food, Water, User } = require("../models");
const withAuth = require("../utils/auth");

// GET /dashboard route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Fetch data for steps, water, and food
    const stepsPromise = Steps.findAll({
     
      attributes: [
        "id",
        "date",
        "step_count",
        "calories_burned",
        "distance_travelled",
      ],
    });

    const waterPromise = Water.findAll({
     
      attributes: ["id", "date", "daily_goal", "actual_intake"],
    });

    const foodPromise = Food.findAll({
     
      attributes: ["id", "food_name", "serving_amount", "calorie_count"],
    });

    // Wait for all promises to resolve
    const [stepsData, waterData, foodData] = await Promise.all([
      stepsPromise,
      waterPromise,
      foodPromise,
    ]);

    const steps = stepsData.map((step) => step.get({ plain: true }));
    const water = waterData.map((waterEntry) =>
      waterEntry.get({ plain: true })
    );
    const food = foodData.map((foodEntry) => foodEntry.get({ plain: true }));

    console.log("Steps data:", steps);
    console.log("Water data:", water);
    console.log("Food data:", food);

    // Render the dashboard view with the combined data
    res.render("dashboard", {
      steps,
      water,
      food,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
   
    });

    const user = userData.get({ plain: true });

    // to show logged in users entry only
    const stepsPromise = Steps.findAll({
     where: { user_id: req.session.user_id },
      attributes: [
        "id",
        "date",
        "step_count",
        "calories_burned",
        "distance_travelled",
      ],
    });

    const waterPromise = Water.findAll({
      where: { user_id: req.session.user_id },
      attributes: ["id", "date", "daily_goal", "actual_intake"],
    });

    const foodPromise = Food.findAll({
 where: { user_id: req.session.user_id },
      attributes: ["id", "food_name", "serving_amount", "calorie_count"],
    });

    // Wait for all promises to resolve
    const [stepsData, waterData, foodData] = await Promise.all([
      stepsPromise,
      waterPromise,
      foodPromise,
    ]);

    const steps = stepsData.map((step) => step.get({ plain: true }));
    const water = waterData.map((waterEntry) =>
      waterEntry.get({ plain: true })
    );
    const food = foodData.map((foodEntry) => foodEntry.get({ plain: true }));

    console.log("Steps data:", steps);
    console.log("Water data:", water);
    console.log("Food data:", food);

    res.render('profile', {
      user,
      steps,
      water,
      food,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get 

// GET login route direct user to login page
router.get("/", (req, res) => {
  if (req.session.logged_in) {
    // If the user is already logged in, redirect the request to another route
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
