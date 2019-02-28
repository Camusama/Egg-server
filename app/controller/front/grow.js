'use strict';
const Controller = require('egg').Controller;

class GrowController extends Controller {
  async class() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.front.grow.getClass();
  }
  async data() {
    const ctx = this.ctx;
    const { cropname } = ctx.request.body;
    ctx.body = await ctx.service.front.grow.getData(cropname);
  }
  async find() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.front.grow.find(id);
  }
}

module.exports = GrowController;
