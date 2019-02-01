'use strict';
const mock = require('egg-mock');

module.exports = {
  up: queryInterface => {
    return (async () => {
      const app = mock.app();
      await app.ready();
      const a = await queryInterface.createTable(
        app.model.Crop.getTableName(),
        app.model.Crop.rawAttributes
      );
      const b = await queryInterface.createTable(
        app.model.CropRel.Seed.getTableName(),
        app.model.CropRel.Seed.rawAttributes
      );
      return a;
    })();
  },

  down: queryInterface => {
    return (async () => {
      const app = mock.app();
      await app.ready();
      const a = await queryInterface.dropTable(
        app.model.CropRel.Seed.getTableName()
      );
      const b = await queryInterface.dropTable(app.model.Crop.getTableName());
    })();
  },
};
