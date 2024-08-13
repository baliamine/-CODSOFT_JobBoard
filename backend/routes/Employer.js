const express = require("express");
const router = express.Router();
const {
  newEmployer,
  allEmployers,
  singleEmployer,
  deleteEmployer,
  updateEmployer,
} = require("../controllers/Employer");

// Get all employers
router.get("/all-employers", allEmployers);

// Get a single employer by ID
router.get("/single-employer/:id", singleEmployer);

// Add a new employer
router.post("/add-employer", newEmployer);

// Delete an employer by ID
router.delete("/delete-employer/:id", deleteEmployer);

// Update an employer by ID
router.patch("/update-employer/:id", updateEmployer);

module.exports = router;
