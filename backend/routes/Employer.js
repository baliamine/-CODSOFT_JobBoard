const express = require("express");
const router = express.Router();
const {
  addEmployer,
  getAllEmployers,
  getEmployerById,
  deleteEmployer,
  updateEmployer,
} = require("../controllers/Employer");

// Get all employers
router.get("/all-employers", getAllEmployers);

// Get a single employer by ID
router.get("/single-employer/:id", getEmployerById);

// Add a new employer
router.post("/add-employer", addEmployer);

// Delete an employer by ID
router.delete("/delete-employer/:id", deleteEmployer);

// Update an employer by ID
router.patch("/update-employer/:id", updateEmployer);

module.exports = router;
