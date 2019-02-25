'use strict';

const Service = require('egg').Service;
const md5 = require('js-md5');
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
    };
    const crops = await ctx.model.FarmRel.Fertilizer.findAndCountAll(query);
    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: crops,
      page: toInt(page) || 1,
      limit: toInt(limit) || 8,
    });
  }

  async create(fertilizer) {
    const { ctx } = this;
    try {
      if (!fertilizer.name || !fertilizer.class) {
        return Object.assign(ERROR, {
          msg: '必须输入肥料类别和名称',
        });
      }
      const cropDB = await ctx.model.FarmRel.Fertilizer.findOne({
        where: {
          name: fertilizer.name,
        },
      });
      if (!cropDB) {
        if (!fertilizer.img) {
          fertilizer.img = defaultIMG;
        }
        const res = await this.ctx.model.FarmRel.Fertilizer.create(fertilizer);

        return Object.assign(SUCCESS, {
          data: res,
        });
      }

      return Object.assign(ERROR, {
        msg: '肥料名已存在',
      });
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }

  async del(id) {
    const { ctx } = this;
    try {
      const fertilizer = await ctx.model.FarmRel.Fertilizer.findById(id);
      if (!fertilizer) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'fertilizer not found',
        });
      }
      fertilizer.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: fertilizer,
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async update({ id, fertilizer }) {
    const { ctx } = this;
    try {
      const cropDB = await ctx.model.FarmRel.Fertilizer.findOne({
        where: {
          id,
        },
      });
      if (!cropDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: '未找到肥料',
        });
      }
      if (!fertilizer.name || !fertilizer.class) {
        return Object.assign(ERROR, {
          msg: '肥料名或肥料类别填写错误',
        });
      }

      const res = await cropDB.update(fertilizer);
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
        msg: '编辑肥料成功',
      });
    } catch (error) {
      ctx.throw(500);
    }
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

module.exports = UserService;
