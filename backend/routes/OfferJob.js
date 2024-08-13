const express = require("express");
const router = express.Router();
const offerJob = require("../models/OfferJob");
const{ addOffer, getAllOffers, getOfferById, deleteOffer,updateOffer }= require("../controllers/OfferJob");

router.get("/all-offer", getAllOffers);

router.get("/single-offer/:id", getOfferById);

router.post("/add-offer",addOffer);

router.delete("/delete-offer/:id", deleteOffer);

router.patch("update-offer/:id", updateOffer);

module.exports = router;
