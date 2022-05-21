const config = require("config");
const webConfig = config.get("webConfig");
var express = require("express");

const router = require("./router");

var app = express();
app.use("/", router);
var server = app.listen(webConfig.port, webConfig.ipAdress, function () {
  var host = server.address().address;
  console.log(server.address());
  var port = server.address().port;

  console.log("env:%s app lstening at http://%s:%s ",process.env.NODE_ENV, host, port);
});
