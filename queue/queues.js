var beeQueue = require('bee-queue',{
  removeOnSuccess: false,
  removeOnFailure: false,
});
var scriptConfig = require("../configs/script");
var keys = Object.keys(scriptConfig.scripts)
var queuesP={}
var queues={};

for(let i=0;i<keys.length;i++)
  {
    /////////////////////////////////////////////////////////////////////////////////////////
    //add queues
    queues[scriptConfig.scripts[keys[i]].name] =new beeQueue(scriptConfig.scripts[keys[i]].name);
    /////////////////////////////////////////////////////////////////////////////////////////
    //add queues process
    queues[scriptConfig.scripts[keys[i]].name].process(require(scriptConfig.scripts[keys[i]].scriptFile));
  }
queuesP.queues= queues;
queuesP.addToAll=function(id,url)
  {
    for(let i=0;i<keys.length;i++)
      {
        this.queues[scriptConfig.scripts[keys[i]].name].createJob({id:id,url:url}).save();
      }
  }
module.exports = queuesP;
