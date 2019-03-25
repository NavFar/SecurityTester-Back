var afterDone = function(id,score,testName,status,result){
  var requestModel = require('../models/Request');
  requestModel.findOne({_id:id},
    function(err,request){
      let anyPending = false;
      //fill result and score at it's place
      for(let i =0;i<request.pendingOn.length;i++)
      {
        if(request.pendingOn[i].name==testName)
        {
          request.pendingOn[i].status=status;
          request.pendingOn[i].score=score;
          request.pendingOn[i].result=result;
        }
        if(request.pendingOn[i].status==0)
          anyPending=true;
      }
      //
      if(!anyPending){
        request.end = new Date();
        request.pending = false;
      }
      //notify users about change
      for(let i=0;i<global.socket[id].length;i++)
      {
        global.socket[id][i].send(JSON.stringify(request));
        if(!anyPending)
          global.socket[id][i].close();
      }
      if(!anyPending){
        global.socket[id]=null;
      }
      request.save(function(err,newRequest){
      });
    });
};
module.exports = afterDone;
