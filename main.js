// load Modules
var express = require('express');
var app = express();
var path = require('path');

// load configs
var serverConfig = require('./configs/server');
var router = require('./configs/router');
// enable configs
app.use(express.static(path.join(__dirname, 'public')));
router.add(app);
// start Server
app.listen(serverConfig.portNumber,function()
{
  console.log("Web Server is Listening to Port "+serverConfig.portNumber);
});
