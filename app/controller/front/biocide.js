'use strict';
const Controller = require('egg').Controller;

class PestController extends Controller {
  async class() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.front.biocide.getClass();
  }
  async data() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.front.biocide.getData();
  }
  async find() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.front.biocide.find(id);
  }
}

module.exports = PestController;
