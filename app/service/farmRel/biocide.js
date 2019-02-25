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
    const crops = await ctx.model.FarmRel.Biocide.findAndCountAll(query);
    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: crops,
      page: toInt(page) || 1,
      limit: toInt(limit) || 8,
    });
  }

  async create(biocide) {
    const { ctx } = this;
    try {
      if (!biocide.name || !biocide.class) {
        return Object.assign(ERROR, {
          msg: '必须输入农药类别和名称',
        });
      }
      const cropDB = await ctx.model.FarmRel.Biocide.findOne({
        where: {
          name: biocide.name,
        },
      });
      if (!cropDB) {
        if (!biocide.img) {
          biocide.img = defaultIMG;
        }
        const res = await this.ctx.model.FarmRel.Biocide.create(biocide);

        return Object.assign(SUCCESS, {
          data: res,
        });
      }

      return Object.assign(ERROR, {
        msg: '农药名已存在',
      });
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }

  async del(id) {
    const { ctx } = this;
    try {
      const biocide = await ctx.model.FarmRel.Biocide.findById(id);
      if (!biocide) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'biocide not found',
        });
      }
      biocide.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: biocide,
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async update({ id, biocide }) {
    const { ctx } = this;
    try {
      const cropDB = await ctx.model.FarmRel.Biocide.findOne({
        where: {
          id,
        },
      });
      if (!cropDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: '未找到农药',
        });
      }
      if (!biocide.name || !biocide.class) {
        return Object.assign(ERROR, {
          msg: '农药名或农药类别填写错误',
        });
      }

      const res = await cropDB.update(biocide);
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
        msg: '编辑农药成功',
      });
    } catch (error) {
      ctx.throw(500);
    }
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

module.exports = UserService;
