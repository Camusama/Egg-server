'use strict';

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;
  const pest = app.model.define(
    'pest',
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
      summary: {
        type: TEXT,
      },
      feature: {
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

  pest.associate = function() {
    app.model.CropRel.Pest.belongsTo(app.model.Crop);
  };
  return pest;
};
