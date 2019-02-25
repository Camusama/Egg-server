'use strict';

const Service = require('egg').Service;
const md5 = require('js-md5');
const { ERROR, SUCCESS } = require('../util/util');
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class UserService extends Service {
  async index(limit, page) {
    const { ctx } = this;
    const query = {
      limit: toInt(limit) || 8,
      offset: toInt((page - 1) * limit) || 0,
    };
    const users = await ctx.model.User.findAndCountAll(query);
    return Object.assign(SUCCESS, {
      msg: '请求成功',
      data: users,
      page: toInt(page) || 1,
      limit: toInt(limit) || 8,
    });
  }

  async create(user) {
    const { ctx } = this;
    try {
      if (!user.username || !user.password) {
        return Object.assign(ERROR, {
          msg: `expected an object with username, password but got: ${JSON.stringify(
            user
          )}`,
        });
      }
      const md5Passwd = md5(user.password);
      user = Object.assign(user, {
        password: md5Passwd,
      });
      const userDB = await ctx.model.User.findOne({
        where: {
          username: user.username,
        },
      });
      if (!userDB) {
        if (!user.authority_id) {
          user.authority_id === 1;
        }
        const res = await this.ctx.model.User.create(user);

        return Object.assign(SUCCESS, {
          data: res,
        });
      }

      return Object.assign(ERROR, {
        msg: 'username already exists',
      });
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }

  async del(id) {
    const { ctx } = this;
    try {
      const user = await ctx.model.User.findById(id);
      if (!user) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }
      user.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: user,
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async update({ id, user }) {
    const { ctx } = this;
    try {
      const userDB = await ctx.model.User.findOne({
        where: {
          id,
        },
      });
      if (!userDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: '未找到用户',
        });
      }
      if (!user.username || !user.password) {
        return Object.assign(ERROR, {
          msg: '密码填写错误',
        });
      }

      const md5Passwd = md5(user.password);
      user = Object.assign(user, {
        password: md5Passwd,
      });
      const res = await userDB.update(user);
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
        msg: '编辑用户成功',
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async login({ username, password }) {
    const { ctx } = this;
    try {
      const user = await ctx.model.User.findOne({
        where: {
          username: username.toString(),
        },
      });
      if (!user) {
        return Object.assign(ERROR, {
          msg: 'username is error',
        });
      }
      if (md5(password) === user.password) {
        ctx.status = 200;
        const hash = md5.hex(password);
        ctx.cookies.set('token', hash, {
          httpOnly: false,
          // 会导致cookie.get返回undefine
          // signed: false,
          maxAge: 3600 * 1000,
          path: '/',
        });
        ctx.cookies.set('user_id', user.id, {
          httpOnly: false,
          // signed: false,
          maxAge: 3600 * 1000,
          path: '/',
        });
        return Object.assign(
          SUCCESS,
          {
            data: Object.assign(user, {
              password: '',
            }),
          },
          {
            msg: '登陆成功',
            token: 'admin', // 前端使用
          }
        );
      }
      return Object.assign(ERROR, {
        msg: 'password is error',
      });
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }
  async logout() {
    const { ctx } = this;
    try {
      if (ctx.cookies.get('token')) {
        ctx.status = 200;
        ctx.cookies.set('token', null);
        ctx.cookies.set('user_id', null);
        return Object.assign(SUCCESS, {
          msg: '登出成功',
        });
      }
      return Object.assign(ERROR, {
        msg: '没有登录',
      });
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }

  async find(id) {
    const { ctx } = this;
    try {
      // const user = await ctx.model.User.findById(id, {
      //   include: [
      //     {
      //       model: ctx.model.Authority,
      //       attributes: [ 'id', 'name' ],
      //     },
      //   ],
      // });
      const user_id = ctx.cookies.get('user_id');
      // console.log('cookieid', user_id, ctx.cookies.get('token'));
      // 避免强转类型
      // console.log('infoid', id);
      if (user_id == id.toString()) {
        // console.log('infoid', id);

        const user = await ctx.model.User.findById(id);
        if (!user) {
          ctx.status = 401;
          return Object.assign(ERROR, {
            msg: 'user not found',
          });
        }
        ctx.status = 200;
        return Object.assign(SUCCESS, {
          msg: '请求成功',
          data: user,
        });
      }
      return Object.assign(ERROR, {
        msg: '请求失败',
      });
    } catch (error) {
      throw 500;
    }
  }
}

module.exports = UserService;
