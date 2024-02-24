const express = require("express");
const router = express.Router();
const RoutePlan = require("../models/PlanRoute");

// POST a new route plan
router.post("/", async (req, res) => {
  const routePlan = new RoutePlan(req.body);
  await routePlan.save();
  res.status(201).send(routePlan);
});

// GET a specific route plan
router.get("/:id", async (req, res) => {
  const routePlan = await RoutePlan.findById(req.params.id);
  res.send(routePlan);
});

// PUT update a route plan
router.put("/:id", async (req, res) => {
  const routePlan = await RoutePlan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(routePlan);
});

// DELETE a route plan
router.delete("/:id", async (req, res) => {
  const routePlan = await RoutePlan.findByIdAndDelete(req.params.id);
  res.send(routePlan);
});

// GET all route plans for a specific user
router.get("/user/:userId", async (req, res) => {
  const routePlans = await RoutePlan.find({ userId: req.params.userId });
  res.send(routePlans);
});


// // GET the optimal route plan
// router.get("/route-plans/optimal/:id", async (req, res) => {
//   const routePlan = await RoutePlan.findById(req.params.id);
//   const optimalRoutePlan = await calculateOptimalRoutePlan(routePlan);
//   res.send(optimalRoutePlan);
// });

module.exports = router;
