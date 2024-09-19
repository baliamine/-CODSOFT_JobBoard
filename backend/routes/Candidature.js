const express = require("express");
const router = express.Router();
const {
  addCandidature,
  getAllCandidatures,
  getCandidatureById,
  deleteCandidature,
  updateCandidature,
} = require("../controllers/Candidature");
const requireAuth=require("../middleware/requireAuth");



// require auth for Employer
router.use(requireAuth)

// Get all candidatures
router.get("/all-candidatures", getAllCandidatures);

// Get a single candidature by ID
router.get("/single-candidature/:id",  getCandidatureById);

// Add a new candidature
router.post("/add-candidature",addCandidature);

// Delete a candidature by ID
router.delete("/delete-candidature/:id", deleteCandidature);

// Update a candidature by ID
router.patch("/update-candidature/:id", updateCandidature);

module.exports = router;
