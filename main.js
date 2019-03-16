// load Modules
var express = require('express');
var compression = require('compression');
var app = express();
var path = require('path');

// load configs
var serverConfig = require('./configs/server');
var router = require('./configs/router');
// enable configs
app.use(compression());
router.add(app);
app.use(express.static("/home/navidfarahmand/Projects/Angular/SecurityTester/dist/SecurityTester"));
app.use("*",express.static("/home/navidfarahmand/Projects/Angular/SecurityTester/dist/SecurityTester/index.html"));
// app.use(express.static(path.join(__dirname, "public")));
// app.use("*",express.static(path.join(__dirname, "public","index.html")));
// start Server
app.listen(serverConfig.portNumber,function()
{
  console.log("Web Server is Listening to Port "+serverConfig.portNumber);
});
