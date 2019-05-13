var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var requestModel = require('../../models/Request');

router.post("/all",function(req,res){
  if(req.body.offset == undefined || req.body.limit== undefined)
      return res.status(400).send();
  if(!(typeof req.body.offset) =="number" || !(typeof req.body.limit) =="number")
      return res.status(400).send();
  if(req.body.offset<0||req.body.limit<0)
      return res.status(400).send();
  requestModel.find({pending:false}).skip(req.body.offset).limit(req.body.limit).sort({end:1}).select({_id:1,pendingOn:1,expose:1,url:1,end:1}).exec(
    (err,requests)=>
    {
      if(err)
        return res.status(500).send(err);
      var trimmedRequests =[];
      for(let i =0;i<requests.length;i++)
      {
        let curScore=0;
        let finishedTest=0;
        for(let j=0;j<requests[i].pendingOn.length;j++)
          {
            if(requests[i].pendingOn[j].status==1)
            {
              curScore+=requests[i].pendingOn[j].score;
              finishedTest++;
            }
          }
          let curReq ={
            _id:requests[i]._id,
            expose:requests[i].expose,
            score:curScore/finishedTest,
            url:requests[i].url,
            end:requests[i].end
          }
          trimmedRequests.push(curReq);
      }
      res.status(200).json(trimmedRequests);
    }
  );
});
router.post("/count",function(req,res){
  requestModel.countDocuments({pending:false}, function (err, count) {
  if (err)
  return res.status(500).send();
  return res.status(200).json(count);
  });
});
module.exports = router;
