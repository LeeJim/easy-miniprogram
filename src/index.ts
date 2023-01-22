import * as dotenv from 'dotenv'
import * as Koa from 'koa';
import * as Router from 'koa-router';

import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger'
import * as json from 'koa-json'

import { Application, Miniprogram, Action } from './controller';
import AppDataSource from './data-source';

dotenv.config()

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = data;

  await next();
})

app.use(json());
app.use(logger())
app.use(bodyParser())

app.use(Application.routes());
app.use(Miniprogram.routes())
app.use(Action.routes())
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 2023;
app.listen(port, () => {
  console.log('Koa Start at:', port);
  AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
        console.log('app data source inited');
        
    })
    .catch((error) => console.log(error))
})
