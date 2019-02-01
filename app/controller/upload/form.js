'use strict';

const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
const dayjs = require('dayjs');
class UploadFormController extends Controller {
  async show() {
    await this.ctx.render('uploadimg/form.html');
  }

  async upload() {
    const { ctx } = this;
    // 获取 steam
    const stream = await ctx.getFileStream();
    // 上传基础目录
    const uplaodBasePath = 'app/public/upload/';
    // 生成文件名
    const filename =
      Date.now() +
      '' +
      Number.parseInt(Math.random() * 10000) +
      path.extname(stream.filename);
    // 生成文件夹
    const dirName = dayjs(Date.now()).format('YYYYMMDD');
    if (!fs.existsSync(uplaodBasePath + dirName)) {
      fs.mkdirSync(path.join(this.config.baseDir, uplaodBasePath, dirName));
    }
    // 生成写入路径
    const target = path.join(
      this.config.baseDir,
      uplaodBasePath,
      dirName,
      filename
    );
    // 写入流
    const writeStream = fs.createWriteStream(target);
    try {
      // 写入文件
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      this.ctx.body = {
        code: 1,
        msg: '上传失败',
      };
    }
    this.ctx.body = {
      code: 0,
      data: 'public/upload/' + dirName + '/' + filename,
      msg: '',
    };
    // 前端使用：服务器地址+文件名
    // http://localhost:7001/public/img/filename
  }
}

module.exports = UploadFormController;
