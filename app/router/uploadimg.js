'use strict';

module.exports = app => {
  app.router.get('/', 'home.render');

  app.router.get('/ajax', app.controller.upload.ajax.show);
  app.router.post('/ajax', app.controller.upload.ajax.upload);

  app.router.get('/form', app.controller.upload.form.show);
  app.router.post('/form', app.controller.upload.form.upload);

  app.router.get('/multiple-file', app.controller.upload.multiple.show);
  app.router.post('/multiple-file', app.controller.upload.multiple.upload);

  app.router.get('/buffer', app.controller.upload.buffer.show);
  app.router.post('/buffer', app.controller.upload.buffer.upload);

  app.router.get('/addCrop', app.controller.upload.addCrop.show);
  app.router.post('/addCrop', app.controller.upload.addCrop.upload);
};
