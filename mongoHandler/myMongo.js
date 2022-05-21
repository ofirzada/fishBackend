const { MongoClient, ObjectId } = require("mongodb");
const mongoAggs = require("./mongoAggs");
const config = require("config");
const mongoConfig = config.get("mongoConfig");

class myMongo {
  //constractor #1, gets conString,dbName,collection
  constructor(collectionName = mongoConfig.collectionName) {
    this.conString = mongoConfig.conString;
    // this.collectionName;
    // this.dbName = dbName;
    this.client;
    // this.searchCollection;
  }

  #connect = async () => {
    try {
      this.client = new MongoClient(this.conString);
      await this.client.connect();
    } catch (err) {
      console.dir(err);
    }
  };
  setCollection = (collectionName) => {
    this.collectionName = collectionName;
  };
  setDb = (collectionName) => {
    this.collectionName = ccollectionName;
  };

  insertOne = async (obj = { account_id: 333333 }) => {
    try {
      await this.#connect();
      await this.searchCollection.insertOne(obj);
      console.log("1 document inserted" + str(obj));
    } catch (error) {
      console.dir(error);
    } finally {
      await this.client.close();
    }
  };

  getUserProducts = async (userName) => {
    try {
      await this.#connect();
      var sample_analytics = await this.client.db("sample_analytics");
      var customers = await sample_analytics.collection("customers");
      var userProductsAggs = mongoAggs.userProducts(userName);
      var findeObj = await customers.aggregate(userProductsAggs);
      var dataArry = await findeObj.toArray();
      return dataArry;
    } catch (error) {
      console.dir(error);
    } finally {
      await this.client.close();
    }
  };

  isUserOwnerOfAccount = async (userName, accountId) => {
    try {
      await this.#connect();
      var sample_analytics = await this.client.db("sample_analytics");
      var customersCollection = await sample_analytics.collection("customers");
      console.log(userName,accountId)

      var findeObj = await customersCollection.findOne({
        username: userName,
        accounts:accountId
      });
      console.log(findeObj)
      if (findeObj != null) {
        return true;
      } else return false;

    } catch (error) {
      console.dir(error);
      return false;
    } finally {
      await this.client.close();
    }
  };
  addProduct = async (product, accountId) => {
    try {
      await this.#connect();
      var sampleAnalytics = await this.client.db("sample_analytics");
      var accountsCollection = await sampleAnalytics.collection("accounts");
      await accountsCollection.updateOne({ account_id: accountId }, { $push: { products: product } });
    } catch (error) {
      console.dir(error);
    } finally {
      await this.client.close();
    }
  };
}

// async function tddd() {
//    var test = new myMongo();
//    var r =await (test.getUserProducts('hillrachel'))
//    console.log(r)

// }
// tddd();

module.exports = myMongo;
