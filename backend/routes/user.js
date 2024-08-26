const express = require("express");
const router = express.Router();



// controller funtck 
const{LoginUser,SignupUser}=require("../controllers/user");

// login router
router.post("/login", LoginUser);

// signup router

router.post("/signup", SignupUser);

module.exports = router;
