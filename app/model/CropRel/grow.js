'use strict';

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;
  const grow = app.model.define(
    'grow',
    {
      name: {
        type: STRING,
        validate: {
          min: 2,
          max: 50,
        },
      },
      corpname: {
        type: STRING,
      },
      skill: {
        type: TEXT,
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

  grow.associate = function() {
    app.model.CropRel.Grow.belongsTo(app.model.Crop);
  };
  return grow;
};
