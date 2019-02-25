'use strict';

module.exports = app => {
  app.get('/api/grow', app.controller.cropRel.grow.index);
  app.post('/api/grow', app.controller.cropRel.grow.create);
  app.del('/api/grow/:id', app.controller.cropRel.grow.destroy);
  app.put('/api/grow/:id', app.controller.cropRel.grow.update);
  app.get('/api/grow/:id', app.controller.cropRel.grow.find);
};
