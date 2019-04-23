var path = require('path');
var scriptsPrefix = "../scripts/";
var script={
    scripts:{
      observatory:{name: "observatory" ,scriptFile: path.join(__dirname,scriptsPrefix,"observatory/observatory"),details: path.join(__dirname,"scripts","observatory")},
      browserSimulations:{name:"browserSimulations" ,scriptFile: path.join(__dirname,scriptsPrefix,"testssl/browserSimulations"),details: path.join(__dirname,"scripts","browserSimulations")},
      grease:{name:"grease" ,scriptFile: path.join(__dirname,scriptsPrefix,"testssl/grease"),details: path.join(__dirname,"scripts","grease")},
      headerResponse:{name:"headerResponse" ,scriptFile: path.join(__dirname,scriptsPrefix,"testssl/headerResponse"),details: path.join(__dirname,"scripts","headerResponse")},
      protocols:{name:"protocols" ,scriptFile: path.join(__dirname,scriptsPrefix,"testssl/protocols"),details: path.join(__dirname,"scripts","protocols")},
      serverPreferences:{name:"serverPreferences" ,scriptFile: path.join(__dirname,scriptsPrefix,"testssl/serverPreferences"),details: path.join(__dirname,"scripts","serverPreferences")},
      vulnerabilities:{name:"vulnerabilities" ,scriptFile: path.join(__dirname,scriptsPrefix,"testssl/vulnerabilities"),details: path.join(__dirname,"scripts","vulnerabilities")},
    },
};
module.exports = script;
