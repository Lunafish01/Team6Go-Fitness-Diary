const router = require("express").Router();
const { food, steps, user, water } = require("../../models");

//GET request retrieving data about all users
router.get("/", async (req, res) => {
  try {
    const dbUserdata = await user.findAll({
      attributes: { exclude: ["password"] },
    });
    console.log("Data retrival successful");

    res.json(dbUserdataUserdata);
  } catch (err) {
    console.error("Error", err);
    res.status(500).json(err);
  }
});

//GET request retriving specific user data by users id
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

//POST requests to create new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const dbUserData = await user.create({
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
    const dbUserData = await user.findOne({
      where: {
        email: req.body.email,
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
