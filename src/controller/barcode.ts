import * as Router from 'koa-router'
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
const domain = 'https://www.gds.org.cn';

import { session } from '../middleware';
import AppDataSource from '../data-source';
import { Barcode } from '../entity';
import { log } from 'console';

const router = new Router({ prefix: '/barcode' });

router.all('/get', session(), async (ctx, next) => {
  const { barcode } = ctx.request.body as any;

  if (!ctx.state.sessionInfo) {
    ctx.body = { code: 401, message: 'need authorized'}
    await next();
    return;
  }

  const barcodeRepo = AppDataSource.getRepository(Barcode);
  const target = await barcodeRepo.findOneBy({ barcode })
  
  ctx.body = { data: target, code: target ? 0 : 404, message: target ? 'success' : 'not found' }
  
  await next();
})

router.all('/create', session(), async (ctx, next) => {
  const { barcode } = ctx.request.body as any; // for test: 6917878036526

  if (!ctx.state.sessionInfo) {
    ctx.body = { code: 401, message: 'need authorized'}
    await next();
    return;
  }
  
  const instance = new Barcode();

  const browser = await puppeteer.launch({
    headless: true,
    args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    ],
    });
  const page = await browser.newPage();

  await page.goto(`${domain}/#/barcodeList/index?type=barcode&keyword=${barcode}`);
  await page.setViewport({width: 1080, height: 1024});
  await page.waitForSelector(
    '.el-image img'
  );

  const body = await page.content();
  const $ = cheerio.load(body);

  instance.barcode = barcode;
  instance.name = $('.lineTwoEllipsis.proName.text-link').text();
  instance.pic = $('.el-image img').attr('src')
  const texts = $('.attr-value.text-attr');

  texts.each((index) => {
    const txt = texts.eq(index).text();
    if (index === 0) {
      instance.company = txt;
    } else if (index === 1) {
      instance.brand = txt;
    } else if (index === 2) {
      const size = txt.split(' ');
      size.forEach((item) => {
        if (item.startsWith('高度')) {
          instance.height = item.split('：')[1]
        } else if (item.startsWith('宽度')) {
          instance.width = item.split('：')[1]
        } else if (item.startsWith('深度')) {
          instance.depth = item.split('：')[1]
        } else if (item.startsWith('毛重')) {
          instance.grossweight = item.split('：')[1]
        }
      })
    }
  })

  await browser.close();

  log(instance)

  await AppDataSource.manager.save(instance)

  ctx.body = { data: null, code: 0, message: 'success' }
  
  await next()
})



export default router;