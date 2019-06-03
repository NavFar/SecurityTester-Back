var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var jwtConfig = require('../../configs/jwt');
var jwtPrivate = fs.readFileSync(jwtConfig.private);
var uniqid = require('uniqid');
var User = require('../../models/User');
var recaptchaChecker = require('../Shared/RecaptchaChecker');

router.post("/login",(req,res)=>{
  if(!req.body.username || !req.body.password|| !req.body.recaptcha)
      return res.status(400).send();
  //Recaptcha check
  recaptchaChecker(req.body.recaptcha,
    function(){
      return res.status(503).send();
    },function(){
      User.findOne({ username: req.body.username }, function (err, user) {
          if (err)
            return res.status(500).send();
          if (!user)
            return res.status(401).send();
          var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
          if (!passwordIsValid)
            return res.status(401).send();
         user.signId = uniqid();
         user.save(function(error, newUser){
           if(error)
             return res.status(500).send();
             var token = jwt.sign({ id: user.signId }, jwtPrivate, {algorithm: 'RS256',expiresIn: jwtConfig.expire });
             return res.status(200).json({ token: token });
          });
           });
    });
  });
  router.post("/username",(req,res)=>{
        return res.status(200).json(res.locals.user.username);
  });
  router.post("/logout",(req,res)=>{
    console.log("hell")
        User.findOne({ username: res.locals.user.username }, function (err, user) {
            user.signId="";
            user.save(function(error, newUser){
              if(error)
                return res.status(500).send();
              console.log("hell1")
              return res.status(200).send();
            });
        });
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
