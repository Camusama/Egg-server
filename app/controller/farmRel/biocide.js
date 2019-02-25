'use strict';
const Controller = require('egg').Controller;

class BiocideController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, page } = ctx.query;
    ctx.body = await ctx.service.farmRel.biocide.index(limit, page);
  }
  async create() {
    const { ctx } = this;
    ctx.body = await ctx.service.farmRel.biocide.create(ctx.request.body);
  }

  async destroy() {
    const { ctx } = this;
    const id = +ctx.params.id;
    ctx.body = await ctx.service.farmRel.biocide.del(id);
  }

  async update() {
    const { ctx } = this;
    const id = +ctx.params.id;
    const biocide = ctx.request.body;
    ctx.body = await ctx.service.farmRel.biocide.update({
      id,
      biocide,
    });
  }

  async find() {
    const { ctx } = this;

    const id = ctx.params.id;
    ctx.body = await ctx.service.farmRel.biocide.find(id);
  }
}
module.exports = BiocideController;
