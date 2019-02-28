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

  require('./router/CropRel/grow')(app);
  require('./router/CropRel/seed')(app);
  require('./router/CropRel/month')(app);
  require('./router/CropRel/pest')(app);

  require('./router/front/biocide')(app);
  require('./router/front/pest')(app);
  require('./router/front/grow')(app);
  require('./router/front/fertilizer')(app);
  require('./router/front/safety')(app);
  require('./router/front/weather')(app);
  require('./router/front/month')(app);
  require('./router/front/seed')(app);

  router.get('/test/add', controller.test.add);
  router.get('/test/remove', controller.test.remove);
};
