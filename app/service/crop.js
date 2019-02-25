'use strict';

const Service = require('egg').Service;
const md5 = require('js-md5');
const { ERROR, SUCCESS, defaultIMG } = require('../util/util');
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
    };
    const crops = await ctx.model.Crop.findAndCountAll(query);
    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: crops,
      page: toInt(page) || 1,
      limit: toInt(limit) || 8,
    });
  }

  async create(crop) {
    const { ctx } = this;
    try {
      if (!crop.name) {
        return Object.assign(ERROR, {
          msg: '必须输入作物名称',
        });
      }
      const cropDB = await ctx.model.Crop.findOne({
        where: {
          name: crop.name,
        },
      });
      if (!cropDB) {
        if (!crop.img) {
          crop.img = defaultIMG;
        }
        const res = await this.ctx.model.Crop.create(crop);

        return Object.assign(SUCCESS, {
          data: res,
        });
      }

      return Object.assign(ERROR, {
        msg: '作物名已存在',
      });
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }

  async del(id) {
    const { ctx } = this;
    try {
      const crop = await ctx.model.Crop.findById(id);
      if (!crop) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'crop not found',
        });
      }
      crop.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: crop,
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async update({ id, crop }) {
    const { ctx } = this;
    try {
      const cropDB = await ctx.model.Crop.findOne({
        where: {
          id,
        },
      });
      if (!cropDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: '未找到作物',
        });
      }
      if (!crop.name) {
        return Object.assign(ERROR, {
          msg: '作物名填写错误',
        });
      }

      const res = await cropDB.update(crop);
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
        msg: '编辑作物成功',
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async find(id) {
    const { ctx } = this;
    try {
      const crop = await ctx.model.Crop.findById(id);
      if (!crop) {
        return Object.assign(ERROR, {
          msg: '未找到作物',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        msg: '请求成功',
        data: crop,
      });
    } catch (error) {
      throw 500;
    }
  }
}

module.exports = UserService;
