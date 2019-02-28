'use strict';

module.exports = app => {
  app.get('/front/seed/class', app.controller.front.seed.class);
  app.post('/front/seed', app.controller.front.seed.data);
  app.post('/front/seed/:id', app.controller.front.seed.find);
};
