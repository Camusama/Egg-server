'use strict';

module.exports = app => {
  app.get('/api/users', app.controller.users.index);
  app.post('/api/users', app.controller.users.create);
  app.del('/api/users/:id', app.controller.users.destroy);
  app.put('/api/users/:id', app.controller.users.update);

  app.post('/api/users/login', app.controller.users.login);
  app.post('/api/users/logout', app.controller.users.logout);

  app.get('/api/users/:id', app.controller.users.find);
  app.get('/api/users/:id/edit', app.controller.users.find);
};
