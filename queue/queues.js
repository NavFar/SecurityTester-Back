var Queue = require('bull');
var scriptConfig = require("../configs/script");
var scriptModel = require("../models/Script");
var keys = Object.keys(scriptConfig.scripts)
var queuesP={}
queuesP.init = function(){
  scriptModel.deleteMany({},function(err){
    if(err)
      throw Error("DB Error");
    var queues={};
    var allScripts=[];
    for(let i=0;i<keys.length;i++)
      {
        /////////////////////////////////////////////////////////////////////////////////////////
        //add queues
        queues[scriptConfig.scripts[keys[i]].name] =new Queue(scriptConfig.scripts[keys[i]].name);
        // queues[scriptConfig.scripts[keys[i]].name].on('stalled', (jobId) => {
        //       console.log(`Job ${jobId} stalled and will be reprocessed`);
    // });
        allScripts.push(require(scriptConfig.scripts[keys[i]].details));
        /////////////////////////////////////////////////////////////////////////////////////////
        //add queues process
        queues[scriptConfig.scripts[keys[i]].name].process(require(scriptConfig.scripts[keys[i]].scriptFile));
      }
      queuesP.queues= queues;
    scriptModel.create(allScripts,function(error,scripts){
      if(error)
        throw Error("DB Error");
    });
  });
}
queuesP.addToAll=function(id,url)
  {
    let tests = [];


    for(let i=0;i<keys.length;i++)
      {
        queuesP.queues[scriptConfig.scripts[keys[i]].name].add({id:id,url:url,name:scriptConfig.scripts[keys[i]].name},{
            attempts: 1,
            // timeout: 8 * 1000,
            removeOnComplete: true,
            removeOnFail: true});//.save();
        tests.push({name:scriptConfig.scripts[keys[i]].name,status:0});
      }
      return tests;
  }
module.exports = queuesP;
