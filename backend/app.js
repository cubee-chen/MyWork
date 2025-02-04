const express = require("express");
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const cors = require('cors');
const userRoute = require("./routes/user.route.js");
const templateRoute = require("./routes/template.route.js");

const app = express();

// middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// routes
app.use("/api/auth", userRoute);
app.use("/api/template", templateRoute);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Connected to MongoDB successfully!");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.log(err);
});
