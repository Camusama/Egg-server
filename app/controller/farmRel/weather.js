'use strict';
const Controller = require('egg').Controller;

class WeatherController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, page } = ctx.query;
    ctx.body = await ctx.service.farmRel.weather.index(limit, page);
  }
  async create() {
    const { ctx } = this;
    ctx.body = await ctx.service.farmRel.weather.create(ctx.request.body);
  }

  async destroy() {
    const { ctx } = this;
    const id = +ctx.params.id;
    ctx.body = await ctx.service.farmRel.weather.del(id);
  }

  async update() {
    const { ctx } = this;
    const id = +ctx.params.id;
    const weather = ctx.request.body;
    ctx.body = await ctx.service.farmRel.weather.update({
      id,
      weather,
    });
  }

  async find() {
    const { ctx } = this;

    const id = ctx.params.id;
    ctx.body = await ctx.service.farmRel.weather.find(id);
  }
}
module.exports = WeatherController;
