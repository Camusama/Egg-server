'use strict';

module.exports = app => {
  app.get('/api/month', app.controller.cropRel.month.index);
  app.post('/api/month', app.controller.cropRel.month.create);
  app.del('/api/month/:id', app.controller.cropRel.month.destroy);
  app.put('/api/month/:id', app.controller.cropRel.month.update);
  app.get('/api/month/:id', app.controller.cropRel.month.find);
};
