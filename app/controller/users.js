'use strict';
const Controller = require('egg').Controller;
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { limit, page } = ctx.query;
    ctx.body = await ctx.service.user.index(limit, page);
  }
  async create() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.create(ctx.request.body);
  }

  async destroy() {
    const { ctx } = this;
    const id = +ctx.params.id;
    ctx.body = await ctx.service.user.del(id);
  }

  async update() {
    const { ctx } = this;
    const id = +ctx.params.id;
    const user = ctx.request.body;
    ctx.body = await ctx.service.user.update({
      id,
      user,
    });
  }

  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    // const { username, password } = ctx.query;
    ctx.body = await ctx.service.user.login({
      username,
      password,
    });
  }
  async logout() {
    const { ctx } = this;

    // const { username, password } = ctx.request.body;
    ctx.body = await ctx.service.user.logout();
  }

  async find() {
    const { ctx } = this;

    const id = ctx.params.id;
    ctx.body = await ctx.service.user.find(id);
  }
}
module.exports = UserController;
