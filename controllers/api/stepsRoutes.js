// import models and routes
const router = require("express").Router();
const { Steps, User } = require("../../models");
const withAuth = require("../../utils/auth");

// GET 'api/steps/' find all content and post it on page
router.get("/", async (req, res) => {
  try {
    console.log("Router Working");
    const stepsData = await Steps.findAll({
      attributes: [
        "id",
        "user_id",
        "date",
        "step_count",
        "calories_burned",
        "distance_travelled",
      ],
      order: [["date", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });
    res.status(200).json(stepsData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET by id return data when user click specific steps entry id
router.get("/:id", async (req, res) => {
  try {
    console.log("Router Working");
    const stepsData = await Steps.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        "id",
        "user_id",
        "date",
        "step_count",
        "calories_burned",
        "distance_travelled",
      ],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    if (!stepsData) {
      res.status(404).json({ message: "No steps entry found with this id" });
      return;
    }

    res.json(stepsData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST route connect user session then create new steps entry
router.post("/", withAuth, async (req, res) => {
  try {
    console.log("Router Working");
    const stepsData = await Steps.create({
      date: req.body.date,
      step_count: req.body.step_count,
      calories_burned: req.body.calories_burned,
      distance_travelled: req.body.distance_travelled,
      user_id: req.session.user_id,
    });

    res.status(201).json(stepsData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//PUT route to edit user by id
router.put("/:id", withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Steps.update(
      {
        date: req.body.date,
        step_count: req.body.step_count,
        calories_burned: req.body.calories_burned,
        distance_travelled: req.body.distance_travelled,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (affectedRows === 0) {
      res.status(404).json({ message: "No steps entry found with this id" });
      return;
    }

    res.json({ message: "Steps entry updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//Delete route to delete user by id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletedRows = await Steps.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (deletedRows === 0) {
      res.status(404).json({ message: "No steps entry found with this id" });
      return;
    }

    res.json({ message: "Steps entry deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
