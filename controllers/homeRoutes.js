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

router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
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

    res.render("profile", {
      user,
      steps,
      water,
      food,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get food route
router.get("/food", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    const foodPromise = Food.findAll({
      attributes: ["id", "food_name", "serving_amount", "calorie_count"],
    });

    // Wait for all promises to resolve
    const [foodData] = await Promise.all([foodPromise]);

    const food = foodData.map((foodEntry) => foodEntry.get({ plain: true }));
    console.log("Food data:", food);

    // Render the dashboard view with the combined data
    res.render("food", {
      user,
      food,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get steps route
router.get("/steps", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
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

    // Wait for all promises to resolve
    const [stepsData] = await Promise.all([stepsPromise]);

    const steps = stepsData.map((step) => step.get({ plain: true }));

    console.log("Steps data:", steps);

    // Render the dashboard view with the combined data
    res.render("steps", {
      user,
      steps,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get water route
router.get("/water", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    // to show logged in users entry only

    const waterPromise = Water.findAll({
      where: { user_id: req.session.user_id },
      attributes: ["id", "date", "daily_goal", "actual_intake"],
    });

    // Wait for all promises to resolve
    const [waterData] = await Promise.all([waterPromise]);

    const water = waterData.map((waterEntry) =>
      waterEntry.get({ plain: true })
    );

    console.log("Water data:", water);

    // Render the dashboard view with the combined data
    res.render("water", {
      user,
      water,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// edit food route
router.get("/edit-food/:id", withAuth, async (req, res) => {
  try {
    const foodId = req.params.id;

    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    // Fetch the specific food entry by ID for the logged-in user
    const foodData = await Food.findOne({
      where: {
        id: foodId,
        user_id: req.session.user_id, // Assuming there's a foreign key relationship between User and Food models
      },
      attributes: ["id", "food_name", "serving_amount", "calorie_count"],
    });

    if (!foodData) {
      // Handle case where the food entry is not found
      res.status(404).render('error', { error: 'Food entry not found' });
      return;
    }

    const food = foodData.get({ plain: true });

    // Render the edit-post view with the specific food data
    res.render("edit-post", {
      user,
      food,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error("Error rendering edit-food page:", err);
    res.status(500).render('error', { error: 'Internal Server Error' });
  }
});

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
