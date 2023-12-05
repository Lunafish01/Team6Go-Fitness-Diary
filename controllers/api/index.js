const router = require("express").Router();
const userRoutes = require("./userRoutes");
const foodRoutes = require("./foodRoutes");
const stepsRoutes = require("./stepsRoutes");
const waterRoutes = require("./waterRoutes");

router.use("/User", userRoutes);
router.use("/Food", foodRoutes);
router.use("/Steps", stepsRoutes);
router.use("/Water", waterRoutes);

router.use((req, res) => {
  res.status(404).end();
  console.log("Route not found");
});
console.log("Route setup complete");

module.exports = router;
