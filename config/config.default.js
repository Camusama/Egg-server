'use strict';

module.exports = appInfo => {
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545063188284_9966';

  // add your config here
  config.middleware = [ 'report', 'notfoundHandler' ];
  config.view = {
    defaultViewEngine: 'nunjucks',
  };
  config.robot = {
    ua: [ /curl/i, /Baiduspider/i ],
  };
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'egg-sequelize-doc-default',
  };
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://39.108.180.157' ],
  };

  config.cors = {
    credentials: true,
  };

  config.alinode = {
    enable: true,
    appid: '78215',
    secret: '43a35df7dbb7689ed06cf7f915a6a34e0c7fdce6',
  };
  return config;
};
