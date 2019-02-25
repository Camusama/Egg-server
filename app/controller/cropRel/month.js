'use strict';
const Controller = require('egg').Controller;

class MonthController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, page } = ctx.query;
    ctx.body = await ctx.service.cropRel.month.index(limit, page);
  }
  async create() {
    const { ctx } = this;
    ctx.body = await ctx.service.cropRel.month.create(ctx.request.body);
  }

  async destroy() {
    const { ctx } = this;
    const id = +ctx.params.id;
    ctx.body = await ctx.service.cropRel.month.del(id);
  }

  async update() {
    const { ctx } = this;
    const id = +ctx.params.id;
    const month = ctx.request.body;
    ctx.body = await ctx.service.cropRel.month.update({
      id,
      month,
    });
  }

  async find() {
    const { ctx } = this;

    const id = ctx.params.id;
    ctx.body = await ctx.service.cropRel.month.find(id);
  }
}
module.exports = MonthController;
