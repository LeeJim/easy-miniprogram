import * as Router from 'koa-router'
import axios from 'axios';
import { createClient } from 'redis';

import { hash } from '../utils'

import AppDataSource from '../data-source';
import { Application, User, Subscription } from '../entity';

const router = new Router({ prefix: '/miniprogram' });

router.all('/login', async (ctx, next) => {
  const { code, id } = ctx.request.body as any;
  
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

  console.log('data', res.data);

  if (res.status == 200) {
    const { session_key, openid } = res.data;
    const client = createClient();
    const userRepostory = AppDataSource.getRepository(User);
    const user = await userRepostory.findOneBy({ openid });

    if (!user) {
      const newUser = new User();
      newUser.openid = openid;
      await AppDataSource.manager.save(newUser)
    }

    const key = hash(session_key + new Date().getTime())

    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    await client.set(key, `${session_key},${openid}`);

    ctx.body = { errno: 0, data: { key }}
  } else {
    ctx.body = { errno: -1, errmsg: res.statusText }
  }
  
  await next()
})

router.all('/add-subscribe', async (ctx, next) => {
  const { templateIds } = ctx.request.body as any; 
  const openid = ''; // todo 通过中间件获得 openid

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