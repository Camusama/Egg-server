'use strict';

module.exports = app => {
  app.get('/api/fertilizer', app.controller.farmRel.fertilizer.index);
  app.post('/api/fertilizer', app.controller.farmRel.fertilizer.create);
  app.del('/api/fertilizer/:id', app.controller.farmRel.fertilizer.destroy);
  app.put('/api/fertilizer/:id', app.controller.farmRel.fertilizer.update);
  app.get('/api/fertilizer/:id', app.controller.farmRel.fertilizer.find);
};
