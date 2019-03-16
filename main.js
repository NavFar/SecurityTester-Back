// load Modules
var fs = require('fs');
var express = require('express');
var compression = require('compression');
var app = express();
var path = require('path');
var https = require('https');
// load configs
var serverConfig = require('./configs/server');
var router = require('./configs/router');
var privateKey  = fs.readFileSync('./configs/https/domain.key', 'utf8');
var certificate = fs.readFileSync('./configs/https/domain.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
// enable configs
app.use(compression());
router.add(app);
app.use(express.static("/home/navidfarahmand/Projects/Angular/SecurityTester/dist/SecurityTester"));
app.use("*",express.static("/home/navidfarahmand/Projects/Angular/SecurityTester/dist/SecurityTester/index.html"));
// app.use(express.static(path.join(__dirname, "public")));
// app.use("*",express.static(path.join(__dirname, "public","index.html")));
// start Server
var httpsServer= https.createServer(credentials,app);
httpsServer.listen(serverConfig.portNumber,function()
{
  console.log("Web Server is Listening to Port "+serverConfig.portNumber);
});
