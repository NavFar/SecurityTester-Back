module.exports = function(req,res,next)
{
if(req.url=="/login/")
  return next();
var fs= require('fs');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/User')
var jwt = require('jsonwebtoken');
var jwtConfig = require('../configs/jwt');
var publicKey = fs.readFileSync(jwtConfig.public);
var token = req.headers['authorization'];
if(token){
var place = token.indexOf(" ");
if(place!=-1)
  token = token.substring(place+1);
}else {
  token=null;
}
if(token)
{
  jwt.verify(token, publicKey,{ algorithm: 'RS256' }, function(err, decoded) {
    if(!err)
    {
      User.findOne({ signId: decoded.id }, function (err, user) {
        if(!err&&user)
        {
          res.locals.user=user;
          next();
        }
        else {
          res.status(401).send();
        }
      });
    }
    else{
      res.status(401).send();
    }
  });
}
else
  res.status(401).send();
}
