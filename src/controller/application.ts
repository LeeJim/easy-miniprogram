import * as Router from 'koa-router'
import AppDataSource from '../data-source';
import { Application } from '../entity';
import { hash } from '../utils'

const router = new Router({ prefix: '/application' });

router.all('/add', async (ctx, next) => {
  const { name, appid, secret } = ctx.request.body as any;
  ctx.body = 'application add'

  const application = new Application();
  const appRepostory = AppDataSource.getRepository(Application);
  const [, appCount] = await appRepostory.findAndCount();

  application.id = hash(name + appid + appCount);
  application.name = name;
  application.appid = appid;
  application.secret = secret;

  await AppDataSource.manager.save(application)
  
  await next()
})

export default router;