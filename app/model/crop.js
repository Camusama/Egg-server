'use strict';

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;

  const Crop = app.model.define(
    'crop',
    {
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
      img: {
        type: STRING,
      },
      tags: {
        type: STRING,
      },
    },
    {
      paranoid: true,
      underscored: true,
    }
  );

  Crop.associate = function() {
    app.model.Crop.hasMany(app.model.CropRel.Seed);
  };
  return Crop;
};
