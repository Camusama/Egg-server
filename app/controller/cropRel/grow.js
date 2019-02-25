'use strict';
const Controller = require('egg').Controller;

class GrowController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, page } = ctx.query;
    ctx.body = await ctx.service.cropRel.grow.index(limit, page);
  }
  async create() {
    const { ctx } = this;
    ctx.body = await ctx.service.cropRel.grow.create(ctx.request.body);
  }

  async destroy() {
    const { ctx } = this;
    const id = +ctx.params.id;
    ctx.body = await ctx.service.cropRel.grow.del(id);
  }

  async update() {
    const { ctx } = this;
    const id = +ctx.params.id;
    const grow = ctx.request.body;
    ctx.body = await ctx.service.cropRel.grow.update({
      id,
      grow,
    });
  }

  async find() {
    const { ctx } = this;

    const id = ctx.params.id;
    ctx.body = await ctx.service.cropRel.grow.find(id);
  }
}
module.exports = GrowController;
