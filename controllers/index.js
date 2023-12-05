const express = require("express");
const router = express.Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes.js");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);

router.use((req, res) => {
  res.status(404).end();
  console.log("Route not found!");
});
console.log("Route setup complete");

module.exports = router;
