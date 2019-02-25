'use strict';

module.exports = app => {
  app.get('/api/pest', app.controller.cropRel.pest.index);
  app.post('/api/pest', app.controller.cropRel.pest.create);
  app.del('/api/pest/:id', app.controller.cropRel.pest.destroy);
  app.put('/api/pest/:id', app.controller.cropRel.pest.update);
  app.get('/api/pest/:id', app.controller.cropRel.pest.find);
};
