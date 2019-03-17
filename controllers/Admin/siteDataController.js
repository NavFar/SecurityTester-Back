var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
var siteData = require('../../models/SiteData');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/getMoto",function(req,res){
siteData.findOne({},(err,data)=>{
  if(err)
    return res.status(500).send();
  return res.status(200).json(data.moto);
  });
});
router.post("/setMoto",function(req,res){
siteData.findOne({},(err,data)=>{
  if(err)
    return res.status(500).send();
  data.moto=req.body.moto;
  data.save(function(error, newData){
    if(error)
      return res.status(500).send();
    return res.status(200).send();
  });
});

});
module.exports = router;
// siteData.create(
//       {
//         moto:{
//           show:true,
//           content:""
//         }
//       }
// ,(err,temp)=>{});
