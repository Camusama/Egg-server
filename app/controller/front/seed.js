'use strict';
const Controller = require('egg').Controller;

class SeedController extends Controller {
  async class() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.front.seed.getClass();
  }
  async data() {
    const ctx = this.ctx;
    const { cropname } = ctx.request.body;
    ctx.body = await ctx.service.front.seed.getData(cropname);
  }
  async find() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.front.seed.find(id);
  }
}

module.exports = SeedController;
