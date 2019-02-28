'use strict';

module.exports = app => {
  app.get('/front/safety/class', app.controller.front.safety.class);
  app.post('/front/safety', app.controller.front.safety.data);
  app.post('/front/safety/:id', app.controller.front.safety.find);
};
