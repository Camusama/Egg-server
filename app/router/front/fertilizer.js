'use strict';

module.exports = app => {
  app.get('/front/fertilizer/class', app.controller.front.fertilizer.class);
  app.post('/front/fertilizer', app.controller.front.fertilizer.data);
  app.post('/front/fertilizer/:id', app.controller.front.fertilizer.find);
};
