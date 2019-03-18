var router = {
 controllers : "../controllers",
 app:"App",
 admin:"Admin",
 prefix : "/api",
 add:function(app){
  var path = require('path');
  app.use(this.prefix+'/app/pageContent',require(path.join(this.controllers,this.app,"PageContent",'PageContentController')));
  app.use(this.prefix+'/app/siteData',require(path.join(this.controllers,this.app,'SiteDataController')));
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //add middleware to handle jwt
  var jwtMiddleware = require('../middlewares/jwt.js');
  app.use(this.prefix+'/admin',jwtMiddleware)
  //actual routes
  app.use(this.prefix+'/admin',require(path.join(this.controllers,this.admin,"UserController")));
  app.use(this.prefix+'/admin/siteData/',require(path.join(this.controllers,this.admin,"siteDataController")));

  }
};
module.exports = router;
