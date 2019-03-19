var router = {
 controllers : "../controllers",
 app:"App",
 admin:"Admin",
 apiPrefix : "/api",
 adminPrefix: "/admin",
 add:function(app){
  var path = require('path');
  app.use(this.apiPrefix+'/app/pageContent',require(path.join(this.controllers,this.app,"PageContent",'PageContentController')));
  app.use(this.apiPrefix+'/app/siteData',require(path.join(this.controllers,this.app,'SiteDataController')));
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //add middleware to handle jwt
  var jwtMiddleware = require('../middlewares/jwt.js');
  app.use(this.apiPrefix+this.adminPrefix,jwtMiddleware)
  //actual routes
  app.use(this.apiPrefix+this.adminPrefix,require(path.join(this.controllers,this.admin,"UserController")));
  app.use(this.apiPrefix+this.adminPrefix+'/siteData/',require(path.join(this.controllers,this.admin,"SiteDataController")));
  app.use(this.apiPrefix+this.adminPrefix+'/uploader/',require(path.join(this.controllers,this.admin,"UploaderController")));

  }
};
module.exports = router;
