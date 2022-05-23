const config = require("config");
const serverSetting = config.get("server");
const auth = require("./Auth");

var cors = require("cors");
var express = require("express");
const employEval = require("./mongoHandler/employEval");

const router = require("./router");
var app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const jwt = require("jsonwebtoken");

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
      const token = jwt.sign({ email }, serverSetting.key, {
        expiresIn: "2h",
      });

      // save user token
      
      EmpData.setToken(token)
      console.log(EmpData.getToken())
      // user
      res.status(200).json(EmpData);
    }
    //res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.use("/", router);

var server = app.listen(
  serverSetting.port,
  serverSetting.ipAdress,
  function () {
    var host = server.address().address;
    console.log(server.address());
    var port = server.address().port;

    console.log(
      "env:%s app lstening at http://%s:%s ",
      process.env.NODE_ENV,
      host,
      port
    );
  }
);
