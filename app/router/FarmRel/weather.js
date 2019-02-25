'use strict';

module.exports = app => {
  app.get('/api/weather', app.controller.farmRel.weather.index);
  app.post('/api/weather', app.controller.farmRel.weather.create);
  app.del('/api/weather/:id', app.controller.farmRel.weather.destroy);
  app.put('/api/weather/:id', app.controller.farmRel.weather.update);
  app.get('/api/weather/:id', app.controller.farmRel.weather.find);
};
