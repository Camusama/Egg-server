'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  // const report = app.middleware.report({});
  require('./router/user')(app);
  require('./router/uploadimg')(app);
  router.resources('Crops', '/api/crops', controller.crop);
  router.get('/test/add', controller.test.add);
  router.get('/test/remove', controller.test.remove);
};
