import * as Router from 'koa-router'
import axios from 'axios';

import AppDataSource from '../data-source';
import { Application } from '../entity';

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

    ctx.body = 'interal cookie' // todo
  }
  
  await next()
})

export default router;