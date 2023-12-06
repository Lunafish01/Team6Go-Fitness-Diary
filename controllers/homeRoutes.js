const sequelize = require("../config/connection");
const router = require("express").Router();
const { Steps, Food, Water, User } = require("../models");
const withAuth = require("../utils/auth");

// router.get("/", withAuth, async (req, res) => {
//   try {
//     console.log("Router Working");
//     // Get all entry data and JOIN with user data
//     const userData = await User.findAll({
//       where: { id: req.session.user_id },
//       include: [
//         {
//           model: User,
//           attributes: { exclude: ["password"] },
//           order: [["username", "ASC"]],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const users = userData.map((User) => User.get({ plain: true }));
//     // Pass serialized data and session flag into template
//     res.render("/dashboard", {
//       users,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// GET /dashboard route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Fetch data for steps, water, and food
    const stepsPromise = Steps.findAll({
      where: { userId: req.session.userId },
      attributes: [
        "id",
        "date",
        "step_count",
        "calories_burned",
        "distance_travelled",
      ],
    });

    const waterPromise = Water.findAll({
      where: { userId: req.session.userId },
      attributes: ["id", "date", "daily_goal", "actual_intake"],
    });

    const foodPromise = Food.findAll({
      where: { userId: req.session.userId },
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

// GET login route direct user to login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    // If the user is already logged in, redirect the request to another route
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
