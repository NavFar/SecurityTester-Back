var headerResponse= function(job,done){
    const { exec } = require('child_process');
    var scoreTable = {'OK':1,'INFO':0,'LOW':-1,'MEDIUM':-2,'HIGH':-3,'CRITICAL':-4};
    // var keys = [ 'protocols','grease','ciphers','pfs','serverPreferences','serverDefaults','headerResponse','vulnerabilities','cipherTests','browserSimulations' ];
    var keys = [ 'headerResponse'];
    var fileName = job.data.id+"headerResponse";
    var path = require('path');
    var score=0;
    var afterDone = require('../afterDone');
    var filePath = path.join(__dirname,"testssl.sh");
    fileName = path.join(__dirname,"result",fileName);
    filePath = path.join(filePath,"testssl.sh");
     exec(filePath+" --quiet --warnings=batch --headers  --jsonfile-pretty "+fileName+" "+job.data.url, (error, stdout, stderr) => {
       if(error | stderr)
       {
         for(var i=0;i<keys.length;i++){
           var result={
             name:keys[i],
             error:{
               exist:true,
               desc:"",
               code:1
             },
             parts:[],
             // overal:''
             pass:false
           };
         }
       }
       else{
       var fs = require('fs');
       try{
         var raw = JSON.parse(fs.readFileSync(fileName, 'utf8'));
       }
       catch (e) {
         var result={
           name:keys[i],
           error:{
             exist:false,
             desc:"",
             code:-1
           },
           parts:[],
           // overal:''
           pass:false
         };
         afterDone(job.data.id,"",job.data.name,-1,result);
         fs.unlinkSync(fileName);
         return done(null)
        }       for(var i=0;i<keys.length;i++)
       {
         var result={
           name:keys[i],
           error:{
             exist:false,
             desc:"",
             code:-1
           },
           parts:[],
           // overal:''
           pass:false
         };
         if(raw.scanTime=="Scan interrupted")
         {
           result.error.exist=true;
           result.error.code=3;
           continue;
         }
         if(!raw.scanResult[0][keys[i]])
         {
           result.error.exist=true;
           result.error.code=2;
           continue;
         }
         var current = raw.scanResult[0][keys[i]];
         for(var j=0;j<current.length;j++)
         {
           var passed=false;
           if(current[j].severity=="INFO"||current[j].severity=="OK")
             passed=true;
           var currentPart={
             name:current[j].id,
             desc:current[j].finding,
             pass:passed,
             score:scoreTable[current[j].severity]
           }
           score = currentPart.score;
           result.parts.push(currentPart);
         }
         score = score/current.length;
         if(score==1)
         result.pass=true;// overal = 'A';
         else if(score>0)
         result.pass=true;// overal ='B';
         else if(score>-1)
          result.pass=true;// overal ='C';
         else if(score>-2)
           result.pass=false;//overal ='D';
         else if(score>-3)
           result.pass=false;//overal ='E';
         else
          result.pass=false;// overal ='F';
         // result.overal = overal;

       }
     }
     if(result.error.exist)
       afterDone(job.data.id,"",job.data.name,-1,result);
     else{
       afterDone(job.data.id,(score+4)*4,job.data.name,1,result);
     }
     fs.unlinkSync(fileName);
    return done(null)
     });
  };
module.exports = headerResponse;
