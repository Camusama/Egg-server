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
    const biocideClass = await ctx.model.FarmRel.Biocide.findAll({
      attributes: [[ Sequelize.literal('distinct class'), 'name' ]],
    });
    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: biocideClass,
    });
  }
  async getData() {
    const { ctx } = this;
    const biocideName = await ctx.model.FarmRel.Biocide.findAll({
      attributes: [ 'class', 'name', 'id', 'img' ],
    });

    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: biocideName,
    });
  }
  async find(id) {
    const { ctx } = this;
    try {
      const biocide = await ctx.model.FarmRel.Biocide.findById(id);
      if (!biocide) {
        return Object.assign(ERROR, {
          msg: '未找到农药',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        msg: '请求成功',
        data: biocide,
      });
    } catch (error) {
      throw 500;
    }
  }
}

module.exports = BiocideService;
