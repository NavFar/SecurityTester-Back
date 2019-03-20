var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var serverConfig = require('../../configs/server');
function getFileContent(fileName){
  var files = fs.readdirSync(path.join(serverConfig.publicDirectoryLocation,fileName));
  var response=[];
  for(let i=0;i<files.length;i++)
  {
    let fileStat = fs.lstatSync(path.join(serverConfig.publicDirectoryLocation,fileName,files[i]));
    let curFileObj = {};
    curFileObj.name = files[i];
    curFileObj.path=fileName;
    curFileObj.isDir=false;
    if(fileStat.isDirectory())
      {
        curFileObj.isDir=true;
        curFileObj.children=getFileContent(path.join(fileName,files[i]));
      }
    response.push(curFileObj);
  }
  return response;
}
router.post("/getDirectoryContent",function(req,res){
  return res.status(200).json(getFileContent("/"));
});
router.post("/upload",function(req,res){
  var filePath =  path.join(serverConfig.publicDirectoryLocation,req.body.basePath,req.body.name);
  if(!req.body.override && fs.existsSync(filePath)){
    return res.status(409).send();
  }
  var base64File = req.body.file.replace(/^data:.*;base64,/, "");
  fs.writeFile(filePath, base64File, 'base64', function(err) {
    if(err){
      return res.status(409).json("");
    }
    return res.status(200).json("");
  });
});
module.exports = router;
