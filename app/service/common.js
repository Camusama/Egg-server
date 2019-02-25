'use strict';

const Service = require('egg').Service;
const { ERROR, SUCCESS } = require('../util/util');

class UserService extends Service {
  async getCrops() {
    const { ctx } = this;
    try {
      const crop = await ctx.model.Crop.findAll({
        attributes: [ 'name' ],
      });
      if (!crop) {
        return Object.assign(ERROR, {
          msg: '服务器错误',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        msg: '请求作物成功',
        data: crop,
      });
    } catch (error) {
      throw 500;
    }
  }
}

module.exports = UserService;
