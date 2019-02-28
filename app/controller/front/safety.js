'use strict';
const Controller = require('egg').Controller;

class safetyController extends Controller {
  async class() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.front.safety.getClass();
  }
  async data() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.front.safety.getData();
  }
  async find() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.front.safety.find(id);
  }
}

module.exports = safetyController;
