'use strict';
const Controller = require('egg').Controller;

class PestController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, page } = ctx.query;
    ctx.body = await ctx.service.cropRel.pest.index(limit, page);
  }
  async create() {
    const { ctx } = this;
    ctx.body = await ctx.service.cropRel.pest.create(ctx.request.body);
  }

  async destroy() {
    const { ctx } = this;
    const id = +ctx.params.id;
    ctx.body = await ctx.service.cropRel.pest.del(id);
  }

  async update() {
    const { ctx } = this;
    const id = +ctx.params.id;
    const pest = ctx.request.body;
    ctx.body = await ctx.service.cropRel.pest.update({
      id,
      pest,
    });
  }

  async find() {
    const { ctx } = this;

    const id = ctx.params.id;
    ctx.body = await ctx.service.cropRel.pest.find(id);
  }
}
module.exports = PestController;
