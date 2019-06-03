var path = require('path');
var server={
  portNumber:443,
  allowedExtensions:["jpg","tiff","gif","bmp","png","zip","rar","doc","docx","pdf","ppt","pptx","mp3","mp4"],
  publicDirectoryLocation:path.join(__dirname,"../public"),
  serverDirectoryLocation:path.join(__dirname,"../"),
};
module.exports = server;
