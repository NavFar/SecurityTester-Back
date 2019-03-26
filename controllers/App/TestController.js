var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var recaptchaChecker = require('../Shared/RecaptchaChecker');
var requestModel = require('../../models/Request');
var scriptConfig = require("../../configs/script");
var queues = require('../../queue/queues');

router.post("/new",(req,res)=>{
  if(typeof req.body.expose!="boolean"||typeof req.body.address!="string"||typeof req.body.recaptcha!="string")
      return res.status(400).send();
  recaptchaChecker(req.body.recaptcha,
        function(){
          return res.status(503).send();
        },function(){
          var urlRegex = RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gi);
          var isAddress = urlRegex.test(req.body.address)
          var ipRegex = require('ip-regex');
          var isIp=ipRegex({exact: true}).test(req.body.address);
          if((isAddress && isIp)||(!isAddress && !isIp))
            return res.status(400).send();
          requestModel.create({
            url:req.body.address,
            start:new Date(),
            pending:true,
            pendingOn:[],
            expose:!req.body.expose,
            results:[]
          },function(err,request){
            if(err)
              return res.status(500).send();
            let tests = queues.addToAll(request._id,req.body.address);
            global.socket[request._id]=[];
            request.pendingOn = tests;
            request.save(function(err,newRequest){
              if(err)
                return res.status(500).send();
              return res.status(200).json(request._id);
            });
          });
        });
});

module.exports = router;
