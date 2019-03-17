var router = {
 controllers : "../controllers",
 app:"App",
 admin:"Admin",
 prefix : "/api",
 add:function(app){
  var path = require('path');
  app.use(this.prefix+'/app/pageContent',require(path.join(this.controllers,this.app,"PageContent",'PageContentController')));
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var jwtMiddleware = require('../middlewares/jwt.js');
  app.use(this.prefix+'/admin',jwtMiddleware)
  app.use(this.prefix+'/admin',require(path.join(this.controllers,this.admin,"UserController")));
  }
};
module.exports = router;
