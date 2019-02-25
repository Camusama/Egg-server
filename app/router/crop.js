'use strict';

module.exports = app => {
  app.get('/api/crop', app.controller.crop.index);
  app.post('/api/crop', app.controller.crop.create);
  app.del('/api/crop/:id', app.controller.crop.destroy);
  app.put('/api/crop/:id', app.controller.crop.update);
  app.get('/api/crop/:id', app.controller.crop.find);
};
