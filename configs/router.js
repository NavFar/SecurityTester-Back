var router = {
 controllers : "../controllers",
 app:"App",
 admin:"Admin",
 prefix : "/api",
 add:function(app){
  var path = require('path');
  app.use(this.prefix+'/app/pageContent',require(path.join(this.controllers,this.app,"PageContent",'PageContentController')));
  }
};
module.exports = router;
