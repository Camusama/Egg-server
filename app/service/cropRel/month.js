'use strict';

const Service = require('egg').Service;
const { ERROR, SUCCESS, defaultIMG } = require('../../util/util');
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class UserService extends Service {
  async index(limit, page) {
    const { ctx } = this;
    const query = {
      limit: toInt(limit) || 8,
      offset: toInt((page - 1) * limit) || 0,
      order: [[ 'crop_id' ]],
    };
    const crops = await ctx.model.CropRel.Month.findAndCountAll(query);
    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: crops,
      page: toInt(page) || 1,
      limit: toInt(limit) || 8,
    });
  }

  async create(month) {
    const { ctx } = this;
    try {
      if (!month.name) {
        return Object.assign(ERROR, {
          msg: '必须输入所属月份',
        });
      } else if (!month.cropname) {
        return Object.assign(ERROR, {
          msg: '所属作物为空',
        });
      }
      const crop = await ctx.model.Crop.findOne({
        where: {
          name: month.cropname,
        },
      });
      if (!crop) {
        return Object.assign(ERROR, {
          msg: '所属作物错误',
        });
      }
      const cropDB = await ctx.model.CropRel.Month.findOne({
        where: {
          name: month.name,
          cropname: month.cropname,
        },
      });
      if (!cropDB) {
        if (!month.img) {
          month.img = defaultIMG;
        }
        const res = await crop.createMonth(month);

        return Object.assign(SUCCESS, {
          data: res,
          msg: '创建农事成功',
        });
      }

      return Object.assign(ERROR, {
        msg: '该作物在该月的农事信息已存在',
      });
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }

  async del(id) {
    const { ctx } = this;
    try {
      const month = await ctx.model.CropRel.Month.findById(id);
      if (!month) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'month not found',
        });
      }
      month.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: month,
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async update({ id, month }) {
    const { ctx } = this;
    try {
      const cropDB = await ctx.model.CropRel.Month.findOne({
        where: {
          id,
        },
      });
      if (!cropDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: '未找到该农事',
        });
      }
      if (!month.name || !month.cropname) {
        return Object.assign(ERROR, {
          msg: '所属作物或月份未填写',
        });
      }
      const crop = await ctx.model.Crop.findOne({
        where: {
          name: month.cropname,
        },
      });
      if (!crop) {
        return Object.assign(ERROR, {
          msg: '所属作物不存在',
        });
      }
      month.crop_id = crop.id;

      if (month.crop_id !== cropDB.crop_id) {
        const DB = await ctx.model.CropRel.Month.findOne({
          where: {
            name: month.name,
            cropname: month.cropname,
          },
        });
        if (DB) {
          return Object.assign(ERROR, {
            msg: '作物已存在此月份的农事',
          });
        }
      }

      const res = await cropDB.update(month);
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
        msg: '编辑农事信息成功',
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async find(id) {
    const { ctx } = this;
    try {
      const month = await ctx.model.CropRel.Month.findById(id);
      if (!month) {
        return Object.assign(ERROR, {
          msg: '未找到该农事',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        msg: '请求成功',
        data: month,
      });
    } catch (error) {
      throw 500;
    }
  }
}

module.exports = UserService;
