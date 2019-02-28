'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');
const { ERROR, SUCCESS } = require('../../util/util');
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class SafetyService extends Service {
  async getClass() {
    const { ctx } = this;
    const safety = await ctx.model.FarmRel.Safety.findAll({
      attributes: [[ Sequelize.literal('distinct class'), 'name' ]],
    });
    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: safety,
    });
  }
  async getData() {
    const { ctx } = this;
    const safety = await ctx.model.FarmRel.Safety.findAll({
      attributes: [ 'class', [ 'safety', 'name' ], 'id', 'img' ],
    });

    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: safety,
    });
  }
  async find(id) {
    const { ctx } = this;
    try {
      const safety = await ctx.model.FarmRel.Safety.findById(id);
      if (!safety) {
        return Object.assign(ERROR, {
          msg: '未找到安全信息',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        msg: '请求成功',
        data: safety,
      });
    } catch (error) {
      throw 500;
    }
  }
}

module.exports = SafetyService;
