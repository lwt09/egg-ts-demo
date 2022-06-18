import { Context } from 'egg';
import BaseService from './base';
/**
 * Test Service
 */
export default class Test extends BaseService {
  constructor(ctx: Context) {
    super(ctx, 'User');
  }

  async getName() {
    // return this.name;
  }

  async getAll() {
    const { ctx } = this;
    // const { username, password } = ctx.input;
    const user = await ctx.model.User.findAll();
    console.log(user, 1);
    return user;
  }

  async addUser() {
    // const { ctx } = this;
    // const { username, password } = ctx.input as {
    //   username: string;
    //   password: string;
    // };
    // // const { username, password } = ctx.input;
    // const user = await ctx.model.User.create();
    // console.log(user, 1);
    // return user;
  }
}
