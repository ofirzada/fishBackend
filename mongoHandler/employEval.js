const { MongoClient, ObjectId } = require("mongodb");
const mail = require("../mailHandler/mailSender");
const config = require("config");
const mongoConfig = config.get("mongoConfig");

class employEval {
  constructor() {
    this.conString = mongoConfig.conString;
    this.client;
    this.token;
  }

  #connect = async () => {
    try {
      this.client = new MongoClient(this.conString);
      await this.client.connect();
    } catch (err) {
      console.dir(err);
    }
  };
  setToken=(token)=>{
    this.token=token;

  }
  getToken=()=>{
    return this.token

  }
  setEmpStatus = async (emailAdress = "ofirzada2010@gmail.com", status = 1) => {
    try {
      await this.#connect();
      var Db = this.client.db("fishingEval");
      var employeesCollention = Db.collection("employees_eval");

      const filter = { email: emailAdress };
      const updateDoc = {
        $set: {
          status: status,
        },
      };
      const result = await employeesCollention.updateOne(
        filter,
        updateDoc,
        { upsert: true }
      );
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
      );

      return true;
    } catch (error) {
      console.dir(error);
    } finally {
      await this.client.close();
    }
  };

  getEmpEval = async () => {
    try {
      await this.#connect();
  
      var Db = this.client.db("fishingEval");
      var employeesCollention = Db.collection("employees_eval");
      var findeObj = await employeesCollention.find({});
      var dataArry = await findeObj.toArray();
      return dataArry;
    } catch (error) {
      console.dir(error);
    } finally {
      await this.client.close();
    }
  };

  login = async (user, password,Token) => {
    try {
      await this.#connect();
      var sample_analytics = await this.client.db("fishingEval");
      var userCollection = await sample_analytics.collection("users");
      console.log(user, password);

      var findeObj = await userCollection.findOne({
        user: user,
        password: password,
      });
     
      console.log(findeObj);
      if (findeObj != null) {
           return findeObj;

        ;
      } else return false;
    } catch (error) {
      console.dir(error);
      return false;
    } finally {
      await this.client.close();
    }
  };
  sendEvalMail = async (email) => {
    var mailData= (await mail.sendMail(email))
    if ( mailData== false) {
      return "mail failed";
    }
    var updateEmp = this.setEmpStatus(email, 0)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error);

        return false;
      });

    return updateEmp;
 
  };
}

async function tddd() {
  var test = new employEval();
  var we= test.sendEvalMail('ofirzada3444@gmail.com')
  var r = await test.getEmpEval();
  console.log(r);
}
//tddd();

module.exports = employEval;
