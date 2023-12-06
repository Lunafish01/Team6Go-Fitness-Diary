const router = require("express").Router();
const userRoutes = require("./userRoutes");
const foodRoutes = require("./foodRoutes");
const stepsRoutes = require("./stepsRoutes");
const waterRoutes = require("./waterRoutes");

router.use("/user", userRoutes); 
router.use("/food", foodRoutes); 
router.use("/steps", stepsRoutes); 
router.use("/water", waterRoutes); 

router.use((req, res) => {
  res.status(404).end();
  console.log("Route not found");
});
console.log("Route setup complete");

module.exports = router;
