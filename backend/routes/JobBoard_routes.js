const express = require("express");
const router = express.Router();
const offerJob = require("../models/JobBoard_models");
const {
  NewofferJob,
  AllofferJobs,
  SingleofferJob,
  deleteOfferJob,
  updateOfferJob,
} = require("../controllers/JobBoard_controller");

router.get("/all-offer", AllofferJobs);

router.get("/single-offer/:id", SingleofferJob);

router.post("/add-offer", NewofferJob);

router.delete("/delete-offer/:id", deleteOfferJob);

router.patch("update-offer/:id", updateOfferJob);

module.exports = router;
