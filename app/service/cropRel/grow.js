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
    const crops = await ctx.model.CropRel.Grow.findAndCountAll(query);
    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: crops,
      page: toInt(page) || 1,
      limit: toInt(limit) || 8,
    });
  }

  async create(grow) {
    const { ctx } = this;
    try {
      if (!grow.name) {
        return Object.assign(ERROR, {
          msg: '必须输入栽培技术名称',
        });
      } else if (!grow.cropname) {
        return Object.assign(ERROR, {
          msg: '所属作物为空',
        });
      }
      const crop = await ctx.model.Crop.findOne({
        where: {
          name: grow.cropname,
        },
      });
      if (!crop) {
        return Object.assign(ERROR, {
          msg: '所属作物错误',
        });
      }
      const cropDB = await ctx.model.CropRel.Grow.findOne({
        where: {
          name: grow.name,
          cropname: grow.cropname,
        },
      });
      if (!cropDB) {
        if (!grow.img) {
          grow.img = defaultIMG;
        }
        const res = await crop.createGrow(grow);

        return Object.assign(SUCCESS, {
          data: res,
          msg: '创建栽培信息成功',
        });
      }

      return Object.assign(ERROR, {
        msg: '栽培技术已存在',
      });
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }

  async del(id) {
    const { ctx } = this;
    try {
      const grow = await ctx.model.CropRel.Grow.findById(id);
      if (!grow) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'grow not found',
        });
      }
      grow.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: grow,
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async update({ id, grow }) {
    const { ctx } = this;
    try {
      const cropDB = await ctx.model.CropRel.Grow.findOne({
        where: {
          id,
        },
      });
      if (!cropDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: '未找到栽培技术',
        });
      }
      if (!grow.name || !grow.cropname) {
        return Object.assign(ERROR, {
          msg: '所属作物或栽培技术名未填写',
        });
      }
      const crop = await ctx.model.Crop.findOne({
        where: {
          name: grow.cropname,
        },
      });
      if (!crop) {
        return Object.assign(ERROR, {
          msg: '所属作物不存在',
        });
      }
      grow.crop_id = crop.id;

      if (grow.crop_id !== cropDB.crop_id) {
        const DB = await ctx.model.CropRel.Grow.findOne({
          where: {
            name: grow.name,
            cropname: grow.cropname,
          },
        });
        if (DB) {
          return Object.assign(ERROR, {
            msg: '作物已存在此栽培技术',
          });
        }
      }

      const res = await cropDB.update(grow);
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
        msg: '编辑栽培信息成功',
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async find(id) {
    const { ctx } = this;
    try {
      const grow = await ctx.model.CropRel.Grow.findById(id);
      if (!grow) {
        return Object.assign(ERROR, {
          msg: '未找到栽培技术',
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

module.exports = UserService;
