'use strict';
const mock = require('egg-mock');

module.exports = {
  up: queryInterface => {
    return (async () => {
      const app = mock.app();
      await app.ready();
      const a = await queryInterface.createTable(
        app.model.CropRel.Grow.getTableName(),
        app.model.CropRel.Grow.rawAttributes
      );
      const b = await queryInterface.createTable(
        app.model.CropRel.Month.getTableName(),
        app.model.CropRel.Month.rawAttributes
      );
      const c = await queryInterface.createTable(
        app.model.CropRel.Pest.getTableName(),
        app.model.CropRel.Pest.rawAttributes
      );
      return a;
    })();
  },

  down: queryInterface => {
    return (async () => {
      const app = mock.app();
      await app.ready();
      const a = await queryInterface.dropTable(
        app.model.CropRel.Pest.getTableName()
      );
      const b = await queryInterface.dropTable(
        app.model.CropRel.Month.getTableName()
      );
      const c = await queryInterface.dropTable(
        app.model.CropRel.Grow.getTableName()
      );
    })();
  },
};
