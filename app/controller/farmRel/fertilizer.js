'use strict';
const Controller = require('egg').Controller;

class FertilizerController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, page } = ctx.query;
    ctx.body = await ctx.service.farmRel.fertilizer.index(limit, page);
  }
  async create() {
    const { ctx } = this;
    ctx.body = await ctx.service.farmRel.fertilizer.create(ctx.request.body);
  }

  async destroy() {
    const { ctx } = this;
    const id = +ctx.params.id;
    ctx.body = await ctx.service.farmRel.fertilizer.del(id);
  }

  async update() {
    const { ctx } = this;
    const id = +ctx.params.id;
    const fertilizer = ctx.request.body;
    ctx.body = await ctx.service.farmRel.fertilizer.update({
      id,
      fertilizer,
    });
  }

  async find() {
    const { ctx } = this;

    const id = ctx.params.id;
    ctx.body = await ctx.service.farmRel.fertilizer.find(id);
  }
}
module.exports = FertilizerController;
