'use strict';
const mock = require('egg-mock');

module.exports = {
  up: queryInterface => {
    return (async () => {
      const app = mock.app();
      await app.ready();
      const a = await queryInterface.createTable(
        app.model.FarmRel.Biocide.getTableName(),
        app.model.FarmRel.Biocide.rawAttributes
      );
      const b = await queryInterface.createTable(
        app.model.FarmRel.Fertilizer.getTableName(),
        app.model.FarmRel.Fertilizer.rawAttributes
      );
      const c = await queryInterface.createTable(
        app.model.FarmRel.Safety.getTableName(),
        app.model.FarmRel.Safety.rawAttributes
      );
      const d = await queryInterface.createTable(
        app.model.FarmRel.Weather.getTableName(),
        app.model.FarmRel.Weather.rawAttributes
      );
      return a;
    })();
  },

  down: queryInterface => {
    return (async () => {
      const app = mock.app();
      await app.ready();
      const a = await queryInterface.dropTable(
        app.model.FarmRel.Biocide.getTableName()
      );
      const b = await queryInterface.dropTable(
        app.model.FarmRel.Safety.getTableName()
      );
      const c = await queryInterface.dropTable(
        app.model.FarmRel.Weather.getTableName()
      );
      const d = await queryInterface.dropTable(
        app.model.FarmRel.Fertilizer.getTableName()
      );
    })();
  },
};
