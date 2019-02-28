'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');
const { ERROR, SUCCESS } = require('../../util/util');
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class weaterService extends Service {
  async getClass() {
    const { ctx } = this;
    const weather = await ctx.model.FarmRel.Weather.findAll({
      attributes: [[ Sequelize.literal('distinct class'), 'name' ]],
    });
    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: weather,
    });
  }
  async getData() {
    const { ctx } = this;
    const weather = await ctx.model.FarmRel.Weather.findAll({
      attributes: [ 'class', [ 'disaster', 'name' ], 'id', 'img' ],
    });

    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: weather,
    });
  }
  async find(id) {
    const { ctx } = this;
    try {
      const weather = await ctx.model.FarmRel.Weather.findById(id);
      if (!weather) {
        return Object.assign(ERROR, {
          msg: '未找到肥料',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        msg: '请求成功',
        data: weather,
      });
    } catch (error) {
      throw 500;
    }
  }
}

module.exports = weaterService;
