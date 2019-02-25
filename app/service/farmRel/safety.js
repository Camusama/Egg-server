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
    const crops = await ctx.model.FarmRel.Safety.findAndCountAll(query);
    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: crops,
      page: toInt(page) || 1,
      limit: toInt(limit) || 8,
    });
  }

  async create(safety) {
    const { ctx } = this;
    try {
      if (!safety.safety || !safety.class) {
        return Object.assign(ERROR, {
          msg: '必须输入类别和安全知识名称',
        });
      }
      const cropDB = await ctx.model.FarmRel.Safety.findOne({
        where: {
          safety: safety.safety,
        },
      });
      if (!cropDB) {
        if (!safety.img) {
          safety.img = defaultIMG;
        }
        const res = await this.ctx.model.FarmRel.Safety.create(safety);

        return Object.assign(SUCCESS, {
          data: res,
        });
      }

      return Object.assign(ERROR, {
        msg: '安全知识名已存在',
      });
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }

  async del(id) {
    const { ctx } = this;
    try {
      const safety = await ctx.model.FarmRel.Safety.findById(id);
      if (!safety) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'safety not found',
        });
      }
      safety.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: safety,
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async update({ id, safety }) {
    const { ctx } = this;
    try {
      const cropDB = await ctx.model.FarmRel.Safety.findOne({
        where: {
          id,
        },
      });
      if (!cropDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: '未找到安全知识',
        });
      }
      if (!safety.safety || !safety.class) {
        return Object.assign(ERROR, {
          msg: '安全知识或类别填写错误',
        });
      }

      const res = await cropDB.update(safety);
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
        msg: '编辑安全知识成功',
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async find(id) {
    const { ctx } = this;
    try {
      const safety = await ctx.model.FarmRel.Safety.findById(id);
      if (!safety) {
        return Object.assign(ERROR, {
          msg: '未找到安全知识',
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

module.exports = UserService;
