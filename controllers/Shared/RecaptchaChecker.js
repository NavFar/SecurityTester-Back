var request = require('request');
var recaptchaConfig = require('../../configs/recaptcha');

var checker = function(recaptchaResponse,err,next){
  request.post({url:recaptchaConfig.server,
      form: {
        secret:recaptchaConfig.secret,
        response:recaptchaResponse,
        remoteip:recaptchaConfig.address
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
