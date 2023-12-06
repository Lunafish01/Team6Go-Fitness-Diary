const sequelize = require("../config/connection");
const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    console.log("Router Working");
    // Get all entry data and JOIN with user data
    const userData = await User.findAll({
      where: { id: req.session.user_id },
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
          order: [["username", "ASC"]],
        },
      ],
    });

    // Serialize data so the template can read it
    const users = userData.map((user) => User.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("/main", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
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

// GET signup route direct user to signup page
// router.get("/login", (req, res) => {
//   res.render("login");
// });


module.exports = router;
