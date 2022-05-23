const express = require("express");
const employEval = require("./mongoHandler/employEval");
const config = require("config");
const router = express.Router();

router.use(async (req, res, next) => {
  router.employEval = new employEval();
  next();
});


//shows all of users accounts
router.post("/sendMail", async (req, res, next) => {
  const email = req.query.email;
  //var isAllowed = await router.employEval.sendEvalMail(email);
    await router.employEval.sendEvalMail(email).then(() => {
      res.send("sent mail to  " + email);
    });
  }
  
  );

router.get("/updateEvalStatus", async (req, res, next) => {
  const email = req.query.email;
  const status= req.query.status
  //var isAllowed = await router.employEval.sendEvalMail(email);
  if (true) {
    await router.employEval.setEmpStatus(email,status).then(() => {
      res.send("status changed  " + email);
    });
  } else {
    res.status(403).send("that account does not exits under your name");
  }
});
router.get("/getEmpData", async (req, res, next) => {
  var products = await router.employEval.getEmpEval();
  console.log("res sent ");
  res.json({ employes: products });
});

module.exports = router;
