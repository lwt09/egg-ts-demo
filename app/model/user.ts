import { Application } from 'egg';

module.exports = (app: Application) => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define(
    'user',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: {
        type: STRING(255),
        allowNull: false,
      },
      password: {
        type: STRING(255),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    },
  );

  return User;
};
