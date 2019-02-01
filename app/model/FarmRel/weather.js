'use strict';

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;

  const weather = app.model.define(
    'weather',
    {
      class: {
        type: STRING,
      },
      disaster: {
        type: STRING,
        validate: {
          min: 2,
          max: 50,
        },
      },
      point1: {
        type: TEXT,
      },
      point2: {
        type: TEXT,
      },
      point3: {
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
  return weather;
};
