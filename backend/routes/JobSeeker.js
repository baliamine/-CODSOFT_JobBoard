const express = require("express");
const router = express.Router();
const {
  newJobSeeker,
  allJobSeekers,
  singleJobSeeker,
  deleteJobSeeker,
  updateJobSeeker,
} = require("../controllers/JobSeeker");

// Get all job seekers
router.get("/all-jobseekers", allJobSeekers);

// Get a single job seeker by ID
router.get("/single-jobseeker/:id", singleJobSeeker);

// Add a new job seeker
router.post("/add-jobseeker", newJobSeeker);

// Delete a job seeker by ID
router.delete("/delete-jobseeker/:id", deleteJobSeeker);

// Update a job seeker by ID
router.patch("/update-jobseeker/:id", updateJobSeeker);

module.exports = router;
