var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var siteData = require('../../models/SiteData');
router.post("/",(req,res)=>{
  siteData.findOne({},(err,data)=>{
    if(err)
      return res.status(500).send();
    var responseData={};
    if(data.moto.show)
      responseData.moto=data.moto.content;
    else
      responseData.moto="";

    if(data.introduction.show)
      responseData.introduction=data.introduction.content;
    else
      responseData.introduction="";

    responseData.title=data.title.content;

    if(data.logo.show)
    {
      responseData.logo=data.logo.url;
      responseData.destination=data.logo.destination;
    }
    else
    {
      responseData.logo="";
      responseData.destination="";
    }

    if(data.copyright.show)
      responseData.copyright=data.copyright.content;
    else
      responseData.copyright="";

    if(data.footer.show)
      responseData.footer=data.footer.content;
    else
      responseData.footer="";

    if(data.aboutUs.show)
      responseData.aboutUs=data.aboutUs.content;
    else
      responseData.aboutUs="";
    if(data.contactUs.show)
      responseData.contactUs=data.contactUs.content;
    else
      responseData.contactUs="";
    responseData.lat =data.contactUs.lat;
    responseData.lng =data.contactUs.lng;
    responseData.faqs =data.faqs;
    return res.status(200).json(responseData);
    });
  });
module.exports = router;
