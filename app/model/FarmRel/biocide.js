'use strict';

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;

  const biocide = app.model.define(
    'biocide',
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
  return biocide;
};
