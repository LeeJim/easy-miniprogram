import * as Router from 'koa-router'
import axios from 'axios';

import redis from '../db/redis';
import { hash } from '../utils'
import { session } from '../middleware';

import AppDataSource from '../data-source';
import { Application, User, Subscription } from '../entity';

const router = new Router({ prefix: '/miniprogram' });

router.all('/login', async (ctx, next) => {
  const { code, id } = ctx.request.body as any; // todo 参数校验
  
  const appRepostory = AppDataSource.getRepository(Application);
  const app = await appRepostory.findOneBy({ id });

  const res = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
    params: {
      appid: app.appid,
      secret: app.secret,
      'js_code': code,
      'grant_type': 'authorization_code',
    }
  })

  if (res.status == 200 && 'openid' in res.data) {
    const { session_key, openid } = res.data;
    const client = await redis();
    const userRepostory = AppDataSource.getRepository(User);
    const user = await userRepostory.findOneBy({ openid });

    if (!user) {
      const newUser = new User();
      newUser.openid = openid;
      await AppDataSource.manager.save(newUser)
    }

    const key = hash(session_key + new Date().getTime())

    await client.set(key, `${session_key},${openid},${app.appid}`);

    ctx.body = { errno: 0, data: { key }}
  } else {
    console.log(res.data.errmsg);
    ctx.body = { errno: -1, errmsg: res.statusText }
  }
  
  await next()
})

router.all('/add-subscribe', session(), async (ctx, next) => {
  const { templateIds } = ctx.request.body as any; 
  const { openid } = ctx.state.sessionInfo;

  try {
    templateIds.forEach(async tmp => {
      const subscription = new Subscription();
  
      subscription.templateid = tmp;
      subscription.openid = openid;
  
      await AppDataSource.manager.save(subscription)
    });
    ctx.body = { errno: 0 }
  } catch(err) {
    ctx.body = { errno: -1, errmsg: err }
  }

  await next();
})

export default router;