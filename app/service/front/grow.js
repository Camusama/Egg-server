'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');
const { ERROR, SUCCESS } = require('../../util/util');
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class PestService extends Service {
  async getClass() {
    const { ctx } = this;
    const crops = await ctx.model.Crop.findAll({
      include: [
        {
          model: ctx.model.CropRel.Grow,
          where: { crop_id: Sequelize.col('crop.id') },
        },
      ],
      attributes: [ 'name', 'id', 'img' ],
    });
    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: crops,
    });
  }
  async getData(cropname) {
    const { ctx } = this;
    const biocideName = await ctx.model.CropRel.Grow.findAll({
      attributes: [ 'name', 'id', 'img' ],
      where: {
        cropname,
      },
    });

    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: biocideName,
    });
  }
  async find(id) {
    const { ctx } = this;
    try {
      const grow = await ctx.model.CropRel.Grow.findById(id);
      if (!grow) {
        return Object.assign(ERROR, {
          msg: '未找到栽培信息',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        msg: '请求成功',
        data: grow,
      });
    } catch (error) {
      throw 500;
    }
  }
}

module.exports = PestService;
