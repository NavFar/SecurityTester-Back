var path = require('path');
var jwt ={
  public:path.join(__dirname,"jwt/public_key.pem"),
  private:path.join(__dirname,"jwt/private_key.pem"),
  expire:86400 ,//in seconds
};
module.exports = jwt;
