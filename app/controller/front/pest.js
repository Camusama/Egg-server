'use strict';
const Controller = require('egg').Controller;

class BiocideController extends Controller {
  async class() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.front.pest.getClass();
  }
  async data() {
    const ctx = this.ctx;
    const { cropname } = ctx.request.body;
    ctx.body = await ctx.service.front.pest.getData(cropname);
  }
  async find() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.front.pest.find(id);
  }
}

module.exports = BiocideController;
