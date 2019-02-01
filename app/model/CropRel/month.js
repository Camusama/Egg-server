'use strict';

module.exports = app => {
  const { STRING, TEXT } = app.Sequelize;
  const month = app.model.define(
    'month',
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
      weather: {
        type: TEXT,
      },
      farm: {
        type: TEXT,
      },
      warn: {
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

  month.associate = function() {
    app.model.CropRel.Month.belongsTo(app.model.Crop);
  };
  return month;
};
