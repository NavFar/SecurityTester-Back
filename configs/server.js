var path = require('path');
var server={
  portNumber:3000,
  publicDirectoryLocation:path.join(__dirname,"../public"),
  serverDirectoryLocation:path.join(__dirname,"../"),

};
module.exports = server;
