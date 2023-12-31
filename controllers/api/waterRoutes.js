// import models and routes
const router = require("express").Router();
const { Water, User } = require("../../models");
const withAuth = require("../../utils/auth");

// GET 'api/water/' find all content and post it on page
router.get("/", async (req, res) => {
  try {
    console.log("Router Working");
    const waterData = await Water.findAll({
        attributes: [
        "id",
        "user_id",
        "date",
        "daily_goal",
        "actual_intake",
      ],
      order: [["date", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    res.status(200).json(waterData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET by id return data when user click specific water entry id
router.get("/:id", async (req, res) => {
    try {
      console.log("Router Working");
      const waterData = await Water.findOne({
        where: {
          id: req.params.id,
        },
        attributes: [ 
        "id",
        "user_id",
        "date",
        "daily_goal",
        "actual_intake",
        ],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });
  
      if (!waterData) {
        res.status(404).json({ message: "No water entry found with this id" });
        return;
      }
  
      res.json(waterData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

// POST route connect user session then create new water entry
router.post("/", withAuth, async (req, res) => {
    try {
        console.log("Router Working");
      const waterData = await Water.create({
        date: req.body.date,
        daily_goal: req.body.daily_goal,
        actual_intake: req.body.actual_intake,
        user_id: req.session.user_id,
      });
  
      res.status(201).json(waterData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

//PUT route to edit user by id
router.put("/:id", withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Water.update(
      {
        date: req.body.date,
        daily_goal: req.body.daily_goal,
        actual_intake: req.body.actual_intake,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (affectedRows === 0) {
      res.status(404).json({ message: "No water entry found with this id" });
      return;
    }

    res.json({ message: "Water entry updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//Delete route to delete user by id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletedRows = await Water.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (deletedRows === 0) {
      res.status(404).json({ message: "No water entry found with this id" });
      return;
    }

    res.json({ message: "Water entry deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;