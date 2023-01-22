import * as Router from 'koa-router'

import { session } from '../middleware';
import AppDataSource from '../data-source';
import { Action } from '../entity';

const router = new Router({ prefix: '/action' });

router.all('/create', session(), async (ctx, next) => {
  const { type, id } = ctx.request.body as any; // todo 参数校验
  const { openid, appid } = ctx.state.sessionInfo;

  try {
    const actionRepository = AppDataSource.getRepository(Action);

    const existAction = await actionRepository.findOneBy({ type, unionid: id, openid, appid });

    if (existAction) {
      const curValue = !existAction.isDelete;
      existAction.isDelete = curValue
      await actionRepository.manager.save(existAction)
      ctx.body = { errno: 0, data: !curValue }
    } else {
      const action = new Action();
    
      action.type = type;
      action.unionid = id;
      action.openid = openid;
      action.appid = appid;
    
      await AppDataSource.manager.save(action)
      ctx.body = { errno: 0, data: true }
    }
  } catch(err) {
    console.log(err);
    ctx.body = { errno: -1, errmsg: err }
  }
  
  await next()
})

router.all('/get', session(), async (ctx, next) => {
  const { type, id } = ctx.request.body as any; // todo 参数校验
  const { openid, appid } = ctx.state.sessionInfo;

  const actionRepository = AppDataSource.getRepository(Action);
  const action = await actionRepository.findOneBy({ openid, type, appid, unionid: id, isDelete: false })

  ctx.body = { errno: 0, data: action != null }

  await next()
})

router.all('/get/all', session(), async (ctx, next) => {
  const { type, id } = ctx.request.body as any; // todo 参数校验
  const { appid } = ctx.state.sessionInfo;

  const actionRepository = AppDataSource.getRepository(Action);
  const [actions, count] = await actionRepository.findAndCountBy({ type, appid, unionid: id, isDelete: false })

  ctx.body = { errno: 0, data: count }

  await next()
})

export default router;