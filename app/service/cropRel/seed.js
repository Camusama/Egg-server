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
    const crops = await ctx.model.CropRel.Seed.findAndCountAll(query);
    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: crops,
      page: toInt(page) || 1,
      limit: toInt(limit) || 8,
    });
  }

  async create(seed) {
    const { ctx } = this;
    try {
      if (!seed.name) {
        return Object.assign(ERROR, {
          msg: '必须输入良种名称',
        });
      } else if (!seed.cropname) {
        return Object.assign(ERROR, {
          msg: '所属作物为空',
        });
      }
      const crop = await ctx.model.Crop.findOne({
        where: {
          name: seed.cropname,
        },
      });
      if (!crop) {
        return Object.assign(ERROR, {
          msg: '所属作物错误',
        });
      }
      const cropDB = await ctx.model.CropRel.Seed.findOne({
        where: {
          name: seed.name,
          cropname: seed.cropname,
        },
      });
      if (!cropDB) {
        if (!seed.img) {
          seed.img = defaultIMG;
        }
        const res = await crop.createSeed(seed);

        return Object.assign(SUCCESS, {
          data: res,
          msg: '创建良种成功',
        });
      }

      return Object.assign(ERROR, {
        msg: '良种名称已存在',
      });
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }

  async del(id) {
    const { ctx } = this;
    try {
      const seed = await ctx.model.CropRel.Seed.findById(id);
      if (!seed) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'seed not found',
        });
      }
      seed.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: seed,
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async update({ id, seed }) {
    const { ctx } = this;
    try {
      const cropDB = await ctx.model.CropRel.Seed.findOne({
        where: {
          id,
        },
      });
      if (!cropDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: '未找到良种',
        });
      }
      if (!seed.name || !seed.cropname) {
        return Object.assign(ERROR, {
          msg: '所属作物或良种名未填写',
        });
      }
      const crop = await ctx.model.Crop.findOne({
        where: {
          name: seed.cropname,
        },
      });
      if (!crop) {
        return Object.assign(ERROR, {
          msg: '所属作物不存在',
        });
      }
      seed.crop_id = crop.id;

      if (seed.crop_id !== cropDB.crop_id) {
        const DB = await ctx.model.CropRel.Seed.findOne({
          where: {
            name: seed.name,
            cropname: seed.cropname,
          },
        });
        if (DB) {
          return Object.assign(ERROR, {
            msg: '作物已存在此良种',
          });
        }
      }

      const res = await cropDB.update(seed);
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
        msg: '编辑良种信息成功',
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async find(id) {
    const { ctx } = this;
    try {
      const seed = await ctx.model.CropRel.Seed.findById(id);
      if (!seed) {
        return Object.assign(ERROR, {
          msg: '未找到良种',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        msg: '请求成功',
        data: seed,
      });
    } catch (error) {
      throw 500;
    }
  }
}

module.exports = UserService;
