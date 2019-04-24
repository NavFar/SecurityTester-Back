var afterDone = function(id,score,testName,status,result){
  var requestModel = require('../models/Request');
  requestModel.findOne({_id:id},
    function(err,request){
      //fill result and score at it's place
      for(let i =0;i<request.pendingOn.length;i++)
      {
        if(request.pendingOn[i].name==testName)
        {
          request.pendingOn[i].status=status;
          request.pendingOn[i].score=score;
          request.pendingOn[i].result=result;
          break;
        }
      }
      request.save(function(err,newRequest){
        if(err)
          return;
      let anyPending = false;
      for(let i =0;i<newRequest.pendingOn.length;i++)
      {
        if(newRequest.pendingOn[i].status==0)
        {
          anyPending=true;
          break;
        }
      }
      if(!anyPending){
        newRequest.end = new Date();
        newRequest.pending = false;
      }
      //notify users about change
      if(global.socket[id])
      for(let i=0;i<global.socket[id].length;i++)
      {
        if(global.socket[id][i]&&global.socket[id][i].readyState==1)
        global.socket[id][i].send(JSON.stringify(newRequest));
        if(!anyPending){
          global.socket[id][i].close();
        }
      }
      if(!anyPending){
        global.socket[id]=null;
        newRequest.save(function(err,lastReq){})
      }
      });
    });
};
module.exports = afterDone;
