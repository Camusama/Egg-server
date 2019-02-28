'use strict';

module.exports = app => {
  app.get('/front/grow/class', app.controller.front.grow.class);
  app.post('/front/grow', app.controller.front.grow.data);
  app.post('/front/grow/:id', app.controller.front.grow.find);
};
