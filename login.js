const config = require("config");
const serverSetting = config.get("server");
const employEval = require("./mongoHandler/employEval");

var cors = require("cors");
var express = require("express");

const router = require("./router");

const jwt = require("jsonwebtoken");

app.use(express.json());

const auth = require("./Auth");

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
app.post("/login", async (req, res) => {
    try {
      // Get user input
      var EmpData = new employEval();
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await EmpData.login(email, password);
  
      if (user) {
        // Create token
        const token = jwt.sign({ user_id: user._id, email }, "hello", {
          expiresIn: "2h",
        });
  
        // save user token
        EmpData.setToken = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  });
  module.exports = app;
