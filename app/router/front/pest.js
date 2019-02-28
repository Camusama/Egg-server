'use strict';

module.exports = app => {
  app.get('/front/pest/class', app.controller.front.pest.class);
  app.post('/front/pest', app.controller.front.pest.data);
  app.post('/front/pest/:id', app.controller.front.pest.find);
};
