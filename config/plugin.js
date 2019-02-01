'use strict';

// had enabled by egg
// exports.static = true;
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
exports.alinode = {
  enable: false,
  package: 'egg-alinode',
};
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};
