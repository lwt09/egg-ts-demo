/**
 * @file input数据的解析, 只针对简单的get和post请求
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
import { Context } from 'egg';

export default (): any => {
  return async (ctx: Context, next: any) => {
    const data = {};
    for (const key in ctx.query) {
      if (!ctx.query.hasOwnProperty(key)) {
        continue;
      }
      const value = ctx.query[key];
      const lower = value.toLowerCase();
      if (lower === 'false') {
        data[key] = false;
        continue;
      }
      if (lower === 'true') {
        data[key] = true;
        continue;
      }
      if (/^([1-9]\d*|0)(\.\d+)?$/.test(value)) {
        data[key] = +value;
        continue;
      }
      data[key] = value;
    }
    // body的数据默认覆盖query数据
    ctx.input = Object.assign(data, ctx.request.body || {});
    await next();
  };
};
