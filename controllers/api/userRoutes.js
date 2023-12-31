const router = require("express").Router();
const { Food, Steps, User, Water } = require("../../models");

//GET request retrieving data about all users
router.get("/", async (req, res) => {
  try {
    const dbUserdata = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    console.log("Data retrival successful");

    res.json(dbUserdata);
  } catch (err) {
    console.error("Error", err);
    res.status(500).json(err);
  }
});

//GET request retriving specific user data by users id
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const dbUserdata = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Food,
          attributes: ["id", "food_name", "serving_amount", "calorie_count"],
        },
        {
          model: Water,
          attributes: ["id", "date", "daily_goal", "actual_intake"],
        },
        {
          model: Steps,
          attributes: [
            "id",
            "step_count",
            "calories_burned",
            "distance_travelled",
          ],
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
    res.status(500).json({ error: 'Internal Sever Error' });
  }
});

//POST requests to create new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const dbUserData = await User.create({
      username,
      email,
      password,
    });
    // Save user session data using req.session
    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;
    res.json(dbUserData);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//POST route for handling user login
router.post("/login", async (req, res) => {
  try {
    console.log("Username", req.body.uersname);
    console.log("Password", req.body.password);

    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      //Declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;