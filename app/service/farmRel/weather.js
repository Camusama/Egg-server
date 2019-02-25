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
    const crops = await ctx.model.FarmRel.Weather.findAndCountAll(query);
    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: crops,
      page: toInt(page) || 1,
      limit: toInt(limit) || 8,
    });
  }

  async create(weather) {
    const { ctx } = this;
    try {
      if (!weather.disaster || !weather.class) {
        return Object.assign(ERROR, {
          msg: '必须输入类别和灾害名称',
        });
      }
      const cropDB = await ctx.model.FarmRel.Weather.findOne({
        where: {
          disaster: weather.disaster,
        },
      });
      if (!cropDB) {
        if (!weather.img) {
          weather.img = defaultIMG;
        }
        const res = await this.ctx.model.FarmRel.Weather.create(weather);

        return Object.assign(SUCCESS, {
          data: res,
        });
      }

      return Object.assign(ERROR, {
        msg: '灾害名已存在',
      });
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }

  async del(id) {
    const { ctx } = this;
    try {
      const weather = await ctx.model.FarmRel.Weather.findById(id);
      if (!weather) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'weather not found',
        });
      }
      weather.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: weather,
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async update({ id, weather }) {
    const { ctx } = this;
    try {
      const cropDB = await ctx.model.FarmRel.Weather.findOne({
        where: {
          id,
        },
      });
      if (!cropDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: '未找灾害信息',
        });
      }
      if (!weather.disaster || !weather.class) {
        return Object.assign(ERROR, {
          msg: '灾害名或类别填写错误',
        });
      }

      const res = await cropDB.update(weather);
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
        msg: '编辑灾害信息成功',
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async find(id) {
    const { ctx } = this;
    try {
      const weather = await ctx.model.FarmRel.Weather.findById(id);
      if (!weather) {
        return Object.assign(ERROR, {
          msg: '未找到灾害信息',
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

module.exports = UserService;
