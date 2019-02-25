'use strict';
const Controller = require('egg').Controller;

class SeedController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, page } = ctx.query;
    ctx.body = await ctx.service.cropRel.seed.index(limit, page);
  }
  async create() {
    const { ctx } = this;
    ctx.body = await ctx.service.cropRel.seed.create(ctx.request.body);
  }

  async destroy() {
    const { ctx } = this;
    const id = +ctx.params.id;
    ctx.body = await ctx.service.cropRel.seed.del(id);
  }

  async update() {
    const { ctx } = this;
    const id = +ctx.params.id;
    const seed = ctx.request.body;
    ctx.body = await ctx.service.cropRel.seed.update({
      id,
      seed,
    });
  }

  async find() {
    const { ctx } = this;

    const id = ctx.params.id;
    ctx.body = await ctx.service.cropRel.seed.find(id);
  }
}
module.exports = SeedController;
