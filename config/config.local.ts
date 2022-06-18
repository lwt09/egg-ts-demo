import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    security: {
      csrf: {
        enable: false,
      },
    },
  };
  config.middleware = ['inputParser'];
  return config;
};
