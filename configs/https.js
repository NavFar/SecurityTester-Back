var path = require('path');
var https ={
  key: path.join(__dirname,"https/domain.key"),
  certification: path.join(__dirname,"https/domain.crt"),
};
module.exports = https;
