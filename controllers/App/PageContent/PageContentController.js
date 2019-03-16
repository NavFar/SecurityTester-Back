var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
router.all("/",(req,res)=>{
  try{
    var content = JSON.parse(fs.readFileSync(path.join(__dirname,"pageContent.json"), 'utf8'));
  }catch (e)
  {
    var content="";
  }
  return res.status(200).json(content);
});
module.exports = router;
