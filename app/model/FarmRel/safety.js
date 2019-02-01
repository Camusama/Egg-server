'use strict';

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;

  const safety = app.model.define(
    'safety',
    {
      class: {
        type: STRING,
      },
      safety: {
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
  return safety;
};
