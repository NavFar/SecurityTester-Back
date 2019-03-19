var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var serverConfig = require('../../configs/server');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
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
module.exports = router;
