require("dotenv").config();
const express = require("express");
const app = express();

// routes exportation
const OfferJob_route = require("./routes/OfferJob");
const JobSeeker_route = require("./routes/JobSeeker");
const Employer_route = require("./routes/Employer");
const Candidature_route = require("./routes/Candidature");
const UserRoute= require("./routes/user");


// db 
const mongoose = require("mongoose");

// model exportation 
const OfferJob_model = require("./models/OfferJob");
const JobSeeker_model= require("./models/JobSeeker");
const Employer_model = require("./models/Employer");
const Candidature_model = require("./models/Candidature");

// middleware
app.use(express.json());



// routes
app.use("/API/offer",OfferJob_route);
app.use("/API/jobseeker",JobSeeker_route);
app.use("/API/Employer",Employer_route);
app.use("/API/candidature",Candidature_route);
app.use("/API/user",UserRoute);

// conect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listen for requets
    app.listen(process.env.PORT, () => {
      console.log(" Connectiong to DB & Server is running on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
