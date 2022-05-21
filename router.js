const express = require("express");
const myMongo = require("./mongoHandler/myMongo");
const config = require("config");
const mongoConfig = config.get("mongoConfig");
const router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
//router.use(() => {
//   var momgoCon = new myMongo(
//     mongoConfig.conString,
//     mongoConfig.dbName,
//     mongoConfig.collectionName
//   );
//   momgoCon.connect();
// console.log("Time:", Date.now());
// next()
//});
///finds a user
//router.get("/Users", async (req, res) => {
//   console.log("Got a Users request for the homepage");
//   momgoCon.find().then((err, res) => {
//     res.send(res);
//   });
//res.send('hrllo')
//});

// This responds a POST request for the homepage
// router.post("/", async (req, res) => {
//   console.log("Got a POST request for the homepage");
//   res.send("Hello POST");
// });

// router.delete("/", async (req, res) => {
//   console.log("Got a POST request for the homepage");
//   res.send("Hello POST");
// });

// router.patch("/", async (req, res) => {
//   console.log("patch");
//   res.send("Hello patch");
// });

  
  // => {3: ["one", "two"], 5: ["three"]}
router.use(async (req, res, next) => {
  
  router.myMongo = new myMongo();
  next();
});
//shows all of users accounts
router.post('/addProduct',async (req, res, next) => {
    console.log("Got a addProduct request for the homepage");
    const userName = req.query.userName;
    const product = req.query.product;
    const accountId=  parseInt(req.query.accountId) ;

    var isAllowed = await router.myMongo.isUserOwnerOfAccount(userName,accountId);
    console.log(isAllowed)
    if (isAllowed) {
       router.myMongo.addProduct(product,accountId).then(()=>{
        res.send('item '+product +" bought")

       })
    }
    else{
      res.status(403).send('that account does not exits under your name')
    }
   
    
}
)
router.get("/getproducts", async (req, res, next) => {
    console.log("Got a getAccounts request for the homepage");
    const userName = req.query.userName;
    var products = await router.myMongo.getUserProducts(userName);
    
    res.json({ accounts: products });
  });
  

module.exports = router;
