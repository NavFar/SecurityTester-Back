var path = require('path');
var server={
  portNumber:443,
  // publicDirectoryLocation:path.join(__dirname,"../public"),
  publicDirectoryLocation:"/home/navidfarahmand/Projects/Angular/SecurityTester/dist/SecurityTester",
  serverDirectoryLocation:path.join(__dirname,"../"),
};
module.exports = server;
