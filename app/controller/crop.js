'use strict';
const Controller = require('egg').Controller;
function toInt (str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class CropController extends Controller {
  async index () {
    const ctx = this.ctx;
    const { limit, page } = ctx.query;
    ctx.body = await ctx.service.crop.index(limit, page);
  }
  async create () {
    const { ctx } = this;
    ctx.body = await ctx.service.crop.create(ctx.request.body);
  }

  async destroy () {
    const { ctx } = this;
    const id = +ctx.params.id;
    ctx.body = await ctx.service.crop.del(id);
  }

  async update () {
    const { ctx } = this;
    const id = +ctx.params.id;
    const crop = ctx.request.body;
    ctx.body = await ctx.service.crop.update({
      id,
      crop,
    });
  }

  async find () {
    const { ctx } = this;

    const id = ctx.params.id;
    ctx.body = await ctx.service.crop.find(id);
  }
}
module.exports = CropController;
