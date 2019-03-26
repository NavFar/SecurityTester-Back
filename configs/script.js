var path = require('path');
var scriptsPrefix = "../scripts/";
var script={
    scripts:{
      observatory:{name: "observatory" ,scriptFile: path.join(__dirname,scriptsPrefix,"observatory/observatory"),describtion:"Check Somethingss"},
      browserSimulations:{name:"browserSimulations" ,scriptFile: path.join(__dirname,scriptsPrefix,"testssl/browserSimulations"),describtion:"browserSimulations"},
      // ciphers:{name:"ciphers" ,scriptFile: path.join(__dirname,scriptsPrefix,"testssl/ciphers"),describtion:"ciphers check"},
      // cipherTests:{name:"cipherTests" ,scriptFile: path.join(__dirname,scriptsPrefix,"testssl/cipherTests"),describtion:" standard cipher check"},
      grease:{name:"grease" ,scriptFile: path.join(__dirname,scriptsPrefix,"testssl/grease"),describtion:"grease check"},
      headerResponse:{name:"headerResponse" ,scriptFile: path.join(__dirname,scriptsPrefix,"testssl/headerResponse"),describtion:"header response check"},
      // pfs:{name:"pfs" ,scriptFile: path.join(__dirname,scriptsPrefix,"testssl/pfs"),describtion:"Checks robust (perfect) forward secrecy key exchange"},
      protocols:{name:"protocols" ,scriptFile: path.join(__dirname,scriptsPrefix,"testssl/protocols"),describtion:"protocols check"},
      serverDefaults:{name:"serverDefaults" ,scriptFile: path.join(__dirname,scriptsPrefix,"testssl/serverDefaults"),describtion:"server defaults check"},
      serverPreferences:{name:"serverPreferences" ,scriptFile: path.join(__dirname,scriptsPrefix,"testssl/serverPreferences"),describtion:"server preferences check"},
      vulnerabilities:{name:"vulnerabilities" ,scriptFile: path.join(__dirname,scriptsPrefix,"testssl/vulnerabilities"),describtion:"vulnerabilities check"},
    },
};
module.exports = script;
