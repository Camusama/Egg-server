'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  // const report = app.middleware.report({});
  require('./router/user')(app);
  require('./router/uploadimg')(app);
  require('./router/crop')(app);
  require('./router/FarmRel/biocide')(app);
  require('./router/FarmRel/fertilizer')(app);
  require('./router/FarmRel/safety')(app);
  require('./router/FarmRel/weather')(app);
  require('./router/common')(app);

  router.get('/test/add', controller.test.add);
  router.get('/test/remove', controller.test.remove);
};
