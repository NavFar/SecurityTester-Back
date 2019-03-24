var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var requestModel = require('../../models/Request');
router.post("/",(req,res)=>{
  if(!req.body.id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(400).send();
  requestModel.findOne({_id:req.body.id},function(err,request){
    if(err)
      return res.status(500).json(err);
    if(!request)
      return res.status(404).send();
    res.status(200).json((request.results));
  });
});
router.ws("/progress",function(ws, req) {
  if(!req.query.id){
    console.log("1");
    return ws.terminate();
  }
    requestModel.findOne({_id:req.query.id},function(err,request){
      if(err){
        console.log("2");
        return ws.terminate();
      }
      if(!request){
        console.log("3");
        return ws.terminate();
      }
      // global.socket[req.query.id].push(ws)
      });
});
module.exports = router;
