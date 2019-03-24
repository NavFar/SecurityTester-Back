var observatory = function(job,done){
  const { exec } = require('child_process');
  exec('observatory '+job.data.url+' --format=json --zero --rescan --quiet', (error, stdout, stderr) => {
    var result={
      name:"Webserver Security",
      error:{
        exist:false,
        desc:"",
        code:-1
      },
      parts:[],
      overal:''
    };
   if (error) {
     result.error.exist=true;
     result.error.desc="Observatory can't start "+error;
     result.error.code=1;
   }
    else if(stderr)
   {
     result.error.exist=true;
     result.error.desc="Observatory can't work properly";
     result.error.code=2;
   }
   else{
   var jsonOutput = JSON.parse(stdout);
   var allKeys = Object.keys(jsonOutput);
   var overalScore = 'F';

   for (var i=0;i<allKeys.length;i++)
   {
     overalScore = jsonOutput[allKeys[i]].score_modifier;
     var currentPart={
       name:jsonOutput[allKeys[i]].name,
       pass:jsonOutput[allKeys[i]].pass,
       desc:jsonOutput[allKeys[i]].score_description,
       score:jsonOutput[allKeys[i]].score_modifier
     }
     result.parts.push(currentPart);
   }
   result.overal='F';
   if(overalScore>=85)
     result.overal = 'A';
   else if(overalScore>=70)
     result.overal = 'B';
   else if(overalScore>=55)
     result.overal = 'C';
   else if(overalScore>=40)
     result.overal = 'D';
   else if(overalScore>=25)
     result.overal = 'E';

 }
 var requestModel = require('../../models/Request');
 // console.log(result)
 requestModel.findOne({_id:job.data.id},
   function(err,request){
     // console.log(job.data.id)
     request.results +=JSON.stringify(result);
     request.save(function(err,newRequest){

     });
 });
 // for(let i=0;i<global.socket[job.data.id].length;i++)
 // {
 //   global.socket[job.data.id][i].send("Ki")
 // }
 return done(null)
 });
}
module.exports=observatory;
