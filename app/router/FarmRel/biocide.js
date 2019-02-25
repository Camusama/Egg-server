'use strict';

module.exports = app => {
  app.get('/api/biocide', app.controller.farmRel.biocide.index);
  app.post('/api/biocide', app.controller.farmRel.biocide.create);
  app.del('/api/biocide/:id', app.controller.farmRel.biocide.destroy);
  app.put('/api/biocide/:id', app.controller.farmRel.biocide.update);
  app.get('/api/biocide/:id', app.controller.farmRel.biocide.find);
};
