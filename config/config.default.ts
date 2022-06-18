import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1653833119426_5405';

  // add your egg config in here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',
    database: 'egg-ts-demo',
    username: 'root',
    password: 'password',
    host: '127.0.0.1',
    port: 3306,
    logging: true,
    timezone: '+08:00',
    pool: {
      max: 30,
      min: 0,
      idle: 10000,
    },
    define: {
      engine: 'InnoDB',
      timestamps: false,
      createdAt: 'createTime',
      updatedAt: 'updateTime',
      charset: 'utf8',
    },
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
