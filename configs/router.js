var router = {
 controllers : "../controllers/",
 prefix : "/api",
add:function(app){
  var path = require('path');
  // app.use(this.prefix+'/user',require(this.controllers+'UserController'));
  app.use(this.prefix+'/app/pageContent',require(path.join(this.controllers,'App','PageContentController')));
}
};
module.exports = router;
