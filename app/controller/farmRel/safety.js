'use strict';
const Controller = require('egg').Controller;

class SafetyController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, page } = ctx.query;
    ctx.body = await ctx.service.farmRel.safety.index(limit, page);
  }
  async create() {
    const { ctx } = this;
    ctx.body = await ctx.service.farmRel.safety.create(ctx.request.body);
  }

  async destroy() {
    const { ctx } = this;
    const id = +ctx.params.id;
    ctx.body = await ctx.service.farmRel.safety.del(id);
  }

  async update() {
    const { ctx } = this;
    const id = +ctx.params.id;
    const safety = ctx.request.body;
    ctx.body = await ctx.service.farmRel.safety.update({
      id,
      safety,
    });
  }

  async find() {
    const { ctx } = this;

    const id = ctx.params.id;
    ctx.body = await ctx.service.farmRel.safety.find(id);
  }
}
module.exports = SafetyController;
