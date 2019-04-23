var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var siteData = require('../../models/SiteData');



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

router.post("/getIntroduction",function(req,res){
siteData.findOne({},(err,data)=>{
  if(err)
    return res.status(500).send();
  return res.status(200).json(data.introduction);
  });
});

router.post("/setIntroduction",function(req,res){
siteData.findOne({},(err,data)=>{
  if(err)
    return res.status(500).send();
  data.introduction=req.body.introduction;
  data.save(function(error, newData){
    if(error)
      return res.status(500).send();
    return res.status(200).send();
    });
  });
});

router.post("/getTitle",function(req,res){
siteData.findOne({},(err,data)=>{
  if(err)
    return res.status(500).send();
  return res.status(200).json(data.title);
  });
});

router.post("/setTitle",function(req,res){
siteData.findOne({},(err,data)=>{
  if(err)
    return res.status(500).send();
  data.title=req.body.title;
  data.save(function(error, newData){
    if(error)
      return res.status(500).send();
    return res.status(200).send();
    });
  });
});

router.post("/getLogo",function(req,res){

siteData.findOne({},(err,data)=>{
  if(err)
    return res.status(500).send();
  return res.status(200).json(data.logo);
  });
});

router.post("/setLogo",function(req,res){
siteData.findOne({},(err,data)=>{
  if(err)
    return res.status(500).send();
  data.logo=req.body.logo;
  data.save(function(error, newData){
    if(error)
      return res.status(500).send();
    return res.status(200).send();
    });
  });
});

router.post("/getCopyright",function(req,res){
siteData.findOne({},(err,data)=>{
  if(err)
    return res.status(500).send();
  return res.status(200).json(data.copyright);
  });
});

router.post("/setCopyright",function(req,res){
siteData.findOne({},(err,data)=>{
  if(err)
    return res.status(500).send();
  data.copyright=req.body.copyright;
  data.save(function(error, newData){
    if(error)
      return res.status(500).send();
    return res.status(200).send();
    });
  });
});

router.post("/getFooter",function(req,res){
siteData.findOne({},(err,data)=>{
  if(err)
    return res.status(500).send();
  return res.status(200).json(data.footer);
  });
});

router.post("/setFooter",function(req,res){
siteData.findOne({},(err,data)=>{
  if(err)
    return res.status(500).send();
  data.footer=req.body.footer;
  data.save(function(error, newData){
    if(error)
      return res.status(500).send();
    return res.status(200).send();
    });
  });
});

router.post("/getAboutUs",function(req,res){
siteData.findOne({},(err,data)=>{
  if(err)
    return res.status(500).send();
  return res.status(200).json(data.aboutUs);
  });
});

router.post("/setAboutUs",function(req,res){
siteData.findOne({},(err,data)=>{
  if(err)
    return res.status(500).send();
  data.aboutUs=req.body.aboutUs;
  data.save(function(error, newData){
    if(error)
      return res.status(500).send();
    return res.status(200).send();
    });
  });
});
router.post("/getContactUs",function(req,res){
siteData.findOne({},(err,data)=>{
  if(err)
    return res.status(500).send();
  return res.status(200).json(data.contactUs);
  });
});
router.post("/setContactUs",function(req,res){
siteData.findOne({},(err,data)=>{
  if(err)
    return res.status(500).send();
  data.contactUs=req.body.contactUs;
  data.save(function(error, newData){
    if(error)
      return res.status(500).send();
    return res.status(200).send();
    });
  });
});
router.post("/getAllFaqs",function(req,res){
siteData.findOne({}).select({faqs:1}).exec((err,data)=>{
  if(err)
    return res.status(500).send();
  return res.status(200).json(data.faqs);
  });
});
router.post("/addFaq",function(req,res){
siteData.findOne({}).select({faqs:1}).exec((err,data)=>{
  if(err)
    return res.status(500).send();
  if(req.body.id=="new"){
    var faq = {
      title:req.body.title,
      question:req.body.question,
      answer:req.body.answer
    }
  data.faqs.push(faq);
  }else{
    for(let i=0;i<data.faqs.length;i++){
      if(data.faqs[i]._id==req.body.id){
        data.faqs[i].title=req.body.title;
        data.faqs[i].question=req.body.question;
        data.faqs[i].answer=req.body.answer;
      }
    }
  }
  data.save(function(error, newData){
    if(error)
      return res.status(500).send();
    return res.status(200).send();
    });
  });
});
router.post("/getFaq",function(req,res){
siteData.findOne({}).select({faqs:1}).exec((err,data)=>{
  if(err)
    return res.status(500).send();
  for(let i=0;i<data.faqs.length;i++){
    if(data.faqs[i]._id==req.body.id)
      return res.status(200).json(data.faqs[i]);
  }
  return res.status(200).json("");
  });
});
router.post("/deleteFaq",function(req,res){
siteData.findOne({}).select({faqs:1}).exec((err,data)=>{
  if(err)
    return res.status(500).send();
  for(let i=0;i<data.faqs.length;i++){
    if(data.faqs[i]._id==req.body.id)
        data.faqs.splice(i,1);
  }
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
//           content:"",
//         },
//         introduction:{
//           show:true,
//           content:"",
//         },
//         title:{
//           content:"",
//         },
//         logo:{
//           show:true,
//           url:"",
//           destination:"",
//         },
//         copyright:{
//           show:true,
//           content:"",
//         },
//         footer:{
//           show:true,
//           content:"",
//         },
//         aboutUs:{
//           show:true,
//           content:"",
//         },
//         contactUs:{
//           show:true,
//           content:"",
//         },
//       }
//       ,(err,temp)=>{});
