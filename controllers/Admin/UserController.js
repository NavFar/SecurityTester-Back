var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var request = require('request');
var jwtConfig = require('../../configs/jwt');
var jwtPrivate = fs.readFileSync(jwtConfig.private);
var User = require('../../models/User');
var recaptchaConfig = require('../../configs/recaptcha');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.post("/login",(req,res)=>{
  if(!req.body.username || !req.body.password|| !req.body.recaptcha)
      return res.status(400).send();
  //Recaptcha check
  request.post({url:recaptchaConfig.server,
      form: {
        secret:recaptchaConfig.secret,
        response:req.body.recaptcha,
        remoteip:recaptchaConfig.server
      }},
      function(error,response,body){
        if(error){
          return res.status(503).send();
        }
        if(!JSON.parse(body).success)
          return res.status(429).send();
        User.findOne({ username: req.body.username }, function (err, user) {
            if (err)
              return res.status(500).send();
            if (!user)
              return res.status(401).send();
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid)
              return res.status(401).send();
           var token = jwt.sign({ id: user._id }, jwtPrivate, {algorithm: 'RS256',expiresIn: jwtConfig.expire });
           return res.status(200).json({ token: token });
             });
   });
  });
  router.post("/username",(req,res)=>{
        return res.status(200).json(res.locals.user.username);
  });
// router.post("/register",(req,res)=>{
//   if(!req.body.username || !req.body.password|| !req.body.recaptcha)
//       return res.status(400).send();
//       var hashedPassword = bcrypt.hashSync(req.body.password, 10);
//       User.create({
//         username : req.body.username,
//         password : hashedPassword,
//         },
//   function (err, user) {
//     if(err){
//       console.log(err);
//       return;
//     }
//     console.log("added");
//   });
// });
module.exports = router;
