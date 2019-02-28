'use strict';

module.exports = app => {
  app.get('/front/month/class', app.controller.front.month.class);
  app.post('/front/month', app.controller.front.month.data);
  app.post('/front/month/:id', app.controller.front.month.find);
};
