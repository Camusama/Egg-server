'use strict';

module.exports = app => {
  app.get('/front/biocide/class', app.controller.front.biocide.class);
  app.post('/front/biocide', app.controller.front.biocide.data);
  app.post('/front/biocide/:id', app.controller.front.biocide.find);
};
