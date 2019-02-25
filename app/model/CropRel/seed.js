'use strict';

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;
  const Seed = app.model.define(
    'seed',
    {
      name: {
        type: STRING,
        validate: {
          min: 2,
          max: 50,
        },
      },
      cropname: {
        type: STRING,
      },
      feature: {
        type: TEXT,
      },
      quality: {
        type: TEXT,
      },
      keypoint: {
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

  Seed.associate = function() {
    app.model.CropRel.Seed.belongsTo(app.model.Crop);
  };
  return Seed;
};
