module.exports = () => {
  return async function(ctx, next) {
    const startTime = Date.now();
    await next();
    // 上报请求时间
    console.log('用时' + (Date.now() - startTime));
  };
};
