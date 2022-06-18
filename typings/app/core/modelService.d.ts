// import * as sequelize from 'sequelize';
import * as sequelize from '../../../node_modules/@types/sequelize/index';

// 新接口
declare namespace superSequelize {
  interface GetOneOrInitializeOptions<T>
    extends sequelize.FindOrInitializeOptions<T> {
    where?: sequelize.WhereOptions<T>;
  }

  interface GetOneOptions<T> extends sequelize.FindOptions<T> {
    where?: sequelize.WhereOptions<T>;
  }

  interface GetListOptions<T> extends GetOneOptions<T> {
    where?: sequelize.WhereOptions<T>;
    page?: number;
    pageSize?: number;
  }

  interface CountOptions<T> extends sequelize.CountOptions {
    where?: sequelize.WhereOptions<T>;
  }

  interface UpdateOptions<T> extends sequelize.UpdateOptions {
    where?: sequelize.WhereOptions<T>;
  }

  type UpdateValues<T> = {
    [P in keyof Attributes<T>]?: Attributes<T>[P] | sequelize.literal;
  };

  interface DefineAttributeColumnOptions
    extends sequelize.DefineAttributeColumnOptions {
    allowUpdate?: boolean;
  }

  interface DefineAttributes {
    [name: string]: DefineAttributeColumnOptions;
  }

  // 业务属性
  type Attributes<T> = T & {
    id?: number;
    updateTime?: sequelize.SequelizeStatic.DATE;
    createTime?: sequelize.SequelizeStatic.DATE;
    isDel?: number;
  };

  // 业务属性返回值
  type ResponseAttributes<T> = T & {
    id: number;
    updateTime: string; // DATETIME返回值是string
    createTime: string;
    isDel: number;
  };

  type Instance<T> = sequelize.Instance<ResponseAttributes<T>> &
    ResponseAttributes<T>;
}

export default superSequelize;
