// load Modules
var fs = require('fs');
var express = require('express');
var compression = require('compression');
var app = express();
var path = require('path');
var https = require('https');
var mongoose = require('mongoose');
// load configs
var serverConfig = require('./configs/server');
var router = require('./configs/router');
var httpsConfigs = require('./configs/https');
var privateKey  = fs.readFileSync(httpsConfigs.key, 'utf8');
var certificate = fs.readFileSync(httpsConfigs.certification, 'utf8');
var credentials = {key: privateKey, cert: certificate};
var dbConfig = require('./configs/db.js');
// enable configs
// enable compression
app.use(compression());
// add api routes
router.add(app);
//connect to database
mongoose.connect('mongodb://'+dbConfig.url+':'+dbConfig.port+'/'+dbConfig.name,{ useNewUrlParser: true });
//serve front-end files
app.use(express.static("/home/navidfarahmand/Projects/Angular/SecurityTester/dist/SecurityTester"));
app.use("*",express.static("/home/navidfarahmand/Projects/Angular/SecurityTester/dist/SecurityTester/index.html"));
// app.use(express.static(serverConfig.publicDirectoryLocation));
// app.use("*",express.static(path.join(serverConfig.publicDirectoryLocation,"index.html")));
//Enable https for server
var httpsServer= https.createServer(credentials,app);
// start Server
httpsServer.listen(serverConfig.portNumber,function()
{
  console.log("Web Server is Listening to Port "+serverConfig.portNumber);
});
