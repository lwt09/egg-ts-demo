import { Controller } from 'egg';

export default class TestController extends Controller {
  public async index() {
    const { ctx } = this;
    // ctx.logger.info('testHasBeenCalled');
    // ctx.logger.warn('testWarnHasBeenCalled');
    ctx.logger.debug('testDebugHasBeenCalled');
    const name = await ctx.service.test.getName();
    ctx.body = {
      name,
      data: '1',
    };
  }

  public async getAll() {
    const { ctx, service } = this;
    const data = await service.test.getAll();
    ctx.body = {
      status: 0,
      data,
    };
  }

  public async addUser() {
    const { ctx, service } = this;
    const data = await service.test.addUser();
    ctx.body = {
      status: 0,
      data,
    };
  }
}
