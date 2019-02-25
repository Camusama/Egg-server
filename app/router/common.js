'use strict';

module.exports = app => {
  app.get('/api/common/getCrop', app.controller.common.getCrops);
};
