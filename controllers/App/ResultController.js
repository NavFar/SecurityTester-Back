var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var requestModel = require('../../models/Request');
var scriptModel = require('../../models/Script');

router.post("/",(req,res)=>{
  if(!req.body.id||!req.body.id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(400).send();
  requestModel.findOne({_id:req.body.id},function(err,request){
    if(err)
      return res.status(500).send();
    if(!request)
      return res.status(404).send();
    let tests = [];
    for(let i=0;i<request.pendingOn.length;i++){
      tests.push(request.pendingOn[i].name);
    }
    scriptModel.find({
      name:{$in:tests}
    },function(error,scripts){
      if(error)
        return res.status(500).send();
      res.status(200).json({request:request,scripts:scripts});
    });
  });
});

router.post("/recent",(req,res)=>{
  requestModel.find({expose:true}).limit(20).sort({end:-1}).select({_id:1,url:1,end:1}).exec(
    (err,requests)=>
    {
      if(err)
        return res.status(500).send();
      res.status(200).json(requests);
    }
  );
});

router.ws("/progress",function(ws, req) {
  if(!req.query.id){
    return ws.terminate();
  }
    requestModel.findOne({_id:req.query.id},function(err,request){
      if(err){
        return ws.terminate();
      }
      if(!request){
        return ws.terminate();
      }
      if(!request.pending){
        return ws.terminate();
      }
      if(global.socket[req.query.id])
      global.socket[req.query.id].push(ws)
      });
});
module.exports = router;
