import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.base.index);
  router.post('/getAll', controller.base.getAll);
  router.post('/addUser', controller.base.addUser);
};
