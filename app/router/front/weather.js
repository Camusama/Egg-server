'use strict';

module.exports = app => {
  app.get('/front/weather/class', app.controller.front.weather.class);
  app.post('/front/weather', app.controller.front.weather.data);
  app.post('/front/weather/:id', app.controller.front.weather.find);
};
