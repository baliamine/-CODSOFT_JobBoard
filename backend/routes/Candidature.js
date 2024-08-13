const express = require("express");
const router = express.Router();
const {
  newCandidature,
  allCandidatures,
  singleCandidature,
  deleteCandidature,
  updateCandidature,
} = require("../controllers/Candidature");

// Get all candidatures
router.get("/all-candidatures", allCandidatures);

// Get a single candidature by ID
router.get("/single-candidature/:id", singleCandidature);

// Add a new candidature
router.post("/add-candidature", newCandidature);

// Delete a candidature by ID
router.delete("/delete-candidature/:id", deleteCandidature);

// Update a candidature by ID
router.patch("/update-candidature/:id", updateCandidature);

module.exports = router;
