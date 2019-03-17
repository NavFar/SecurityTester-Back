var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// router.post("",(res,req)=>{
//
// });
module.exports = router;
