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
    const crops = await ctx.model.CropRel.Pest.findAndCountAll(query);
    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: crops,
      page: toInt(page) || 1,
      limit: toInt(limit) || 8,
    });
  }

  async create(pest) {
    const { ctx } = this;
    try {
      if (!pest.name) {
        return Object.assign(ERROR, {
          msg: '必须输入病害名称',
        });
      } else if (!pest.cropname) {
        return Object.assign(ERROR, {
          msg: '所属作物为空',
        });
      }
      const crop = await ctx.model.Crop.findOne({
        where: {
          name: pest.cropname,
        },
      });
      if (!crop) {
        return Object.assign(ERROR, {
          msg: '所属作物错误',
        });
      }
      const cropDB = await ctx.model.CropRel.Pest.findOne({
        where: {
          name: pest.name,
          cropname: pest.cropname,
        },
      });
      if (!cropDB) {
        if (!pest.img) {
          pest.img = defaultIMG;
        }
        const res = await crop.createPest(pest);

        return Object.assign(SUCCESS, {
          data: res,
          msg: '创建病害信息成功',
        });
      }

      return Object.assign(ERROR, {
        msg: '病害信息已存在',
      });
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }

  async del(id) {
    const { ctx } = this;
    try {
      const pest = await ctx.model.CropRel.Pest.findById(id);
      if (!pest) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'pest not found',
        });
      }
      pest.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: pest,
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async update({ id, pest }) {
    const { ctx } = this;
    try {
      const cropDB = await ctx.model.CropRel.Pest.findOne({
        where: {
          id,
        },
      });
      if (!cropDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: '未找到病害',
        });
      }
      if (!pest.name || !pest.cropname) {
        return Object.assign(ERROR, {
          msg: '所属作物或病害名未填写',
        });
      }
      const crop = await ctx.model.Crop.findOne({
        where: {
          name: pest.cropname,
        },
      });
      if (!crop) {
        return Object.assign(ERROR, {
          msg: '所属作物不存在',
        });
      }
      pest.crop_id = crop.id;

      if (pest.crop_id !== cropDB.crop_id) {
        const DB = await ctx.model.CropRel.Pest.findOne({
          where: {
            name: pest.name,
            cropname: pest.cropname,
          },
        });
        if (DB) {
          return Object.assign(ERROR, {
            msg: '作物已存在病害信息',
          });
        }
      }

      const res = await cropDB.update(pest);
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
        msg: '编辑病害信息成功',
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async find(id) {
    const { ctx } = this;
    try {
      const pest = await ctx.model.CropRel.Pest.findById(id);
      if (!pest) {
        return Object.assign(ERROR, {
          msg: '未找到病害信息',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        msg: '请求成功',
        data: pest,
      });
    } catch (error) {
      throw 500;
    }
  }
}

module.exports = UserService;
