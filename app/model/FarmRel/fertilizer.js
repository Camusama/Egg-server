'use strict';

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;

  const fertilizer = app.model.define(
    'fertilizer',
    {
      class: {
        type: STRING,
      },
      name: {
        type: STRING,
        validate: {
          min: 2,
          max: 50,
        },
      },
      summary: {
        type: TEXT,
      },
      warn: {
        type: TEXT,
      },
      usage: {
        type: TEXT,
      },
      img: {
        type: STRING,
      },
    },
    {
      paranoid: true,
      underscored: true,
    }
  );
  return fertilizer;
};
