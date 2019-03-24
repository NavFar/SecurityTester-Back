var path = require('path');
var scriptsPrefix = "../scripts/";
var script={
    scripts:{
      observatory:{name: "observatory" ,scriptFile: path.join(__dirname,scriptsPrefix,"observatory/observatory")},
      // testssl:{name:"testssl" ,scriptFile: path.join(__dirname,scriptsPrefix,"testssl/testssl")},
    },
};
module.exports = script;
