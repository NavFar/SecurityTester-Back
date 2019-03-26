var Queue = require('bull');
var scriptConfig = require("../configs/script");
var keys = Object.keys(scriptConfig.scripts)
var queuesP={}
var queues={};

for(let i=0;i<keys.length;i++)
  {
    /////////////////////////////////////////////////////////////////////////////////////////
    //add queues
    queues[scriptConfig.scripts[keys[i]].name] =new Queue(scriptConfig.scripts[keys[i]].name);
    // queues[scriptConfig.scripts[keys[i]].name].on('stalled', (jobId) => {
    //       console.log(`Job ${jobId} stalled and will be reprocessed`);
// });
    /////////////////////////////////////////////////////////////////////////////////////////
    //add queues process
    queues[scriptConfig.scripts[keys[i]].name].process(require(scriptConfig.scripts[keys[i]].scriptFile));
  }
queuesP.queues= queues;
queuesP.addToAll=function(id,url)
  {
    let tests = [];
    for(let i=0;i<keys.length;i++)
      {
        this.queues[scriptConfig.scripts[keys[i]].name].add({id:id,url:url,name:scriptConfig.scripts[keys[i]].name});//.save();
        tests.push({name:scriptConfig.scripts[keys[i]].name,status:0,describtion:scriptConfig.scripts[keys[i]].describtion});
      }
      return tests;
  }
module.exports = queuesP;
