'use strict';

module.exports = app => {
  app.get('/api/safety', app.controller.farmRel.safety.index);
  app.post('/api/safety', app.controller.farmRel.safety.create);
  app.del('/api/safety/:id', app.controller.farmRel.safety.destroy);
  app.put('/api/safety/:id', app.controller.farmRel.safety.update);
  app.get('/api/safety/:id', app.controller.farmRel.safety.find);
};
