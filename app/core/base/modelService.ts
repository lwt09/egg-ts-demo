/* eslint-disable @typescript-eslint/indent */
/**
 * @file service 基类
 * @author zengbaoqing<misterapptracy@gmail.com>
 */

import { Context, Service } from 'egg';
// import * as sequelize from '../../../node_modules/@types/sequelize/index';
import * as sequelize from 'sequelize';
import superSequelize from '../../../typings/app/core/modelService';

export default abstract class ModelService<
  TInstance,
  TAttributes
> extends Service {
  // TAttributes 是完整参数
  // superSequelize.Attributes<TAttributes> 是TAttributes & BizAttributes
  constructor(
    ctx: Context,
    public model: sequelize.Model<TInstance, TAttributes>,
    public schema: superSequelize.DefineAttributes
  ) {
    super(ctx);
  }

  public create(values?: TAttributes, options?: sequelize.CreateOptions) {
    return this.model.create(values, options);
  }

  public bulkCreate(
    records: TAttributes[],
    options?: sequelize.BulkCreateOptions
  ) {
    return this.model.bulkCreate(records, options);
  }

  // sequelize.FindOptions<TAttributes & BizAttributes>
  public getOne(
    options: superSequelize.GetOneOptions<
      superSequelize.Attributes<TAttributes>
    > = {}
  ) {
    if (!options.where) {
      options.where = {};
    }
    options.raw = true;
    options.where.isDel = 0;
    return this.model.findOne<superSequelize.Attributes<TAttributes>>(options);
  }

  // sequelize.FindOptions<TAttributes & BizAttributes>
  public async exists(
    options: superSequelize.GetOneOptions<
      superSequelize.Attributes<TAttributes>
    > = {}
  ) {
    if (!options.where) {
      options.where = {};
    }
    options.where.isDel = 0;
    options.attributes = ['id'];
    const data = await this.model.findOne<
      superSequelize.Attributes<TAttributes>
    >(options);
    return !!data;
  }

  public count(
    options: superSequelize.CountOptions<
      superSequelize.Attributes<TAttributes>
    > = {}
  ) {
    if (!options.where) {
      options.where = {};
    }
    options.where.isDel = 0;
    return this.model.count(options as any);
  }

  public getList(
    options: superSequelize.GetListOptions<
      superSequelize.Attributes<TAttributes>
    > = {},
    pagination = true
  ) {
    if (!options.where) {
      options.where = {};
    }
    options.raw = true;
    options.where.isDel = 0;
    if (pagination) {
      const page = options.page && options.page >= 1 ? options.page : 1;
      const pageSize =
        options.pageSize && options.pageSize > 0
          ? options.pageSize > 1000
            ? 1000
            : options.pageSize
          : 10;
      options.offset = (page - 1) * pageSize;
      options.limit = pageSize;
    }
    return this.model.findAll<superSequelize.Attributes<TAttributes>>(options);
  }

  public getAll(
    options: superSequelize.GetListOptions<
      superSequelize.Attributes<TAttributes>
    > = {}
  ) {
    if (!options.where) {
      options.where = {};
    }
    options.raw = true;
    options.where.isDel = 0;
    return this.model.findAll<superSequelize.Attributes<TAttributes>>(options);
  }

  // 不存在固定参数isDel等。
  public getCustomAll(
    options: superSequelize.GetListOptions<TAttributes> = {}
  ) {
    if (!options.where) {
      options.where = {};
    }
    options.raw = true;
    return this.model.findAll<TAttributes>(options);
  }

  public async update(
    values: superSequelize.UpdateValues<TAttributes>,
    options: superSequelize.UpdateOptions<
      superSequelize.Attributes<TAttributes>
    >,
    emptyOk = true
  ) {
    const { logger } = this.ctx;
    if (!options.where) {
      options.where = {};
    }
    options.where.isDel = 0;
    const dontAllowUpdate: string[] = [];
    const dontExists: string[] = [];
    Object.keys(values).forEach((key) => {
      if (values[key] === undefined) {
        // 删除空内容字段
        delete values[key];
      } else if (!this.schema[key]) {
        // 去掉不存在的字段
        delete values[key];
        dontExists.push(key);
      } else if (
        this.schema[key].allowUpdate != null &&
        !this.schema[key].allowUpdate
      ) {
        // 去掉不能允许修改字段
        delete values[key];
        dontAllowUpdate.push(key);
      }
    });
    if (dontAllowUpdate.length) {
      logger.warn(`不允许更新的字段：${dontAllowUpdate.join(',')}`);
    }
    if (dontExists.length) {
      logger.warn(`model中不存在要更新的字段：${dontExists.join(',')}`);
    }
    if (!Object.keys(values).length) {
      if (emptyOk) {
        return [0, []];
      }
      throw sequelize.DatabaseError('没有更新数据');
    }
    return this.model.update(values as any, options as any);
  }

  // 逻辑删除的数据不能再修改
  public delete(
    options: superSequelize.UpdateOptions<
      superSequelize.Attributes<TAttributes>
    >
  ) {
    const values = { isDel: +new Date() } as Partial<
      superSequelize.Attributes<TAttributes>
    >;
    if (!options.where) {
      options.where = {};
    }
    options.where.isDel = 0;
    return this.model.update(values, options as any);
  }

  // 真删
  public forceDelete(options) {
    return this.model.destroy(options);
  }
}
