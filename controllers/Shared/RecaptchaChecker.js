var request = require('request');

var checker = function(serverAddress,secretKey,recaptchaResponse,remoteIp,err,next){
  request.post({url:serverAddress,
      form: {
        secret:secretKey,
        response:recaptchaResponse,
        remoteip:remoteIp
      }},
      function(error,response,body){
        if(error){
          err();
        }
        if(!JSON.parse(body).success)
          err();
        next();
      });
}
module.exports = checker;
