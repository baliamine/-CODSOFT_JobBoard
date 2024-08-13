require("dotenv").config();
const express = require("express");
const app = express();
const Routes = require("./routes/JobBoard_routes");
const mongoose = require("mongoose");
const JobBoard_models = require("./models/JobBoard_models");

// middleware
app.use(express.json());
// routes


app.use("/API/offer",Routes);

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
