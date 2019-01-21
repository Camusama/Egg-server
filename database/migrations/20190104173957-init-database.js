'use strict';
const mock = require('egg-mock');
module.exports = {
  up: async queryInterface => {
    return (async () => {
      const app = mock.app();
      await app.ready();
      const a = await queryInterface.createTable(
        app.model.Authority.getTableName(),
        app.model.Authority.rawAttributes
      );
      const b = await queryInterface.createTable(
        app.model.User.getTableName(),
        app.model.User.rawAttributes
      );
      const d = await queryInterface.createTable(
        app.model.Catalog.getTableName(),
        app.model.Catalog.rawAttributes
      );
      const e = await queryInterface.createTable(
        app.model.Collect.getTableName(),
        app.model.Collect.rawAttributes
      );
      const c = await queryInterface.createTable(
        app.model.Blog.getTableName(),
        app.model.Blog.rawAttributes
      );
      const f = await queryInterface.createTable(
        app.model.Comment.getTableName(),
        app.model.Comment.rawAttributes
      );
      return true;
    })();
  },
  down: async queryInterface => {
    return (async () => {
      const app = mock.app();
      await app.ready();
      return await queryInterface.dropTable(app.model.User.getTableName());
    })();
  },
};
