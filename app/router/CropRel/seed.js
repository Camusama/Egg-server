'use strict';

module.exports = app => {
  app.get('/api/seed', app.controller.cropRel.seed.index);
  app.post('/api/seed', app.controller.cropRel.seed.create);
  app.del('/api/seed/:id', app.controller.cropRel.seed.destroy);
  app.put('/api/seed/:id', app.controller.cropRel.seed.update);
  app.get('/api/seed/:id', app.controller.cropRel.seed.find);
};
