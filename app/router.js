'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  // const report = app.middleware.report({});
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);
  router.resources('users', '/users', controller.users);
};
