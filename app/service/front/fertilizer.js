'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');
const { ERROR, SUCCESS } = require('../../util/util');
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class BiocideService extends Service {
  async getClass() {
    const { ctx } = this;
    const fertilizer = await ctx.model.FarmRel.Fertilizer.findAll({
      attributes: [[ Sequelize.literal('distinct class'), 'name' ]],
    });
    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: fertilizer,
    });
  }
  async getData() {
    const { ctx } = this;
    const fertilizer = await ctx.model.FarmRel.Fertilizer.findAll({
      attributes: [ 'class', 'name', 'id', 'img' ],
    });

    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: fertilizer,
    });
  }
  async find(id) {
    const { ctx } = this;
    try {
      const fertilizer = await ctx.model.FarmRel.Fertilizer.findById(id);
      if (!fertilizer) {
        return Object.assign(ERROR, {
          msg: '未找到肥料',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        msg: '请求成功',
        data: fertilizer,
      });
    } catch (error) {
      throw 500;
    }
  }
}

module.exports = BiocideService;
