'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class CropController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: toInt(ctx.query.limit) ? toInt(ctx.query.limit) : 8,
      offset: toInt((ctx.query.page - 1) * ctx.query.limit)
        ? toInt((ctx.query.page - 1) * ctx.query.limit)
        : 0,
    };
    ctx.body = await ctx.model.Crop.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Crop.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { name, summary, img, tags } = ctx.request.body;
    const Crop = await ctx.model.Crop.create({ name, summary, img, tags });
    ctx.status = 201;
    ctx.body = Crop;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Crop = await ctx.model.Crop.findById(id);
    if (!Crop) {
      ctx.status = 404;
      return;
    }

    const { name, summary, img, tags } = ctx.request.body;
    await Crop.update({ name, summary, img, tags });
    ctx.body = Crop;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Crop = await ctx.model.Crop.findById(id);
    if (!Crop) {
      ctx.status = 404;
      return;
    }

    await Crop.destroy();
    ctx.status = 200;
  }
}

module.exports = CropController;
