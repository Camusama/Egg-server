'use strict';

const Controller = require('egg').Controller;

class CommonController extends Controller {
  async getCrops() {
    const { ctx } = this;
    ctx.body = await ctx.service.common.getCrops();
  }
}

module.exports = CommonController;
