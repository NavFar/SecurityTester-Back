var observatory = function(job,done){
  const { exec } = require('child_process');
  exec('observatory '+job.data.url+' --format=json --zero --rescan --quiet', (error, stdout, stderr) => {
    var result={
      // name:job.data.name,
      error:{
        exist:false,
        desc:"",
        code:-1
      },
      parts:[],
      // overal:''
      pass:false
    };
  var overalScore = 0;
   if (error) {
     result.error.exist=true;
     // result.error.desc="Observatory can't start";
     result.error.desc="";
     result.error.code=1;
   }
    else if(stderr)
   {
     result.error.exist=true;
     // result.error.desc="Observatory can't work properly";
     result.error.desc="";
     result.error.code=2;
   }
   else{
   var jsonOutput = JSON.parse(stdout);
   var allKeys = Object.keys(jsonOutput);

   for (var i=0;i<allKeys.length;i++)
   {
     overalScore += jsonOutput[allKeys[i]].score_modifier;
     var currentPart={
       name:jsonOutput[allKeys[i]].name,
       pass:jsonOutput[allKeys[i]].pass,
       desc:jsonOutput[allKeys[i]].score_description,
       score:jsonOutput[allKeys[i]].score_modifier
     }
     result.parts.push(currentPart);
   }

   if(overalScore>=85)
     result.pass =true;
   else if(overalScore>=70)
     result.pass =true;
   else if(overalScore>=55)
     result.pass =false;
   else if(overalScore>=40)
     result.pass =false;
   else if(overalScore>=25)
     result.pass =false;
 }
  var afterDone = require('../afterDone');
  if(result.error.exist)
    afterDone(job.data.id,"",job.data.name,-1,result);
  else
    afterDone(job.data.id,overalScore/5,job.data.name,1,result);
 return done(null)
 });
}
module.exports=observatory;
