'use strict';
const Controller = require('egg').Controller;

class FertilizerController extends Controller {
  async class() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.front.weather.getClass();
  }
  async data() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.front.weather.getData();
  }
  async find() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.front.weather.find(id);
  }
}

module.exports = FertilizerController;
