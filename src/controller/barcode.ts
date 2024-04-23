import * as Router from 'koa-router'
import AppDataSource from '../data-source';
import { Sku, Barcode } from '../entity';

const router = new Router({ prefix: '/barcode' });

router.all('/get', async (ctx, next) => {
  const { barcode } = ctx.request.body as any;

  const barcodeReoo = AppDataSource.getRepository(Barcode);
  const target = await barcodeReoo.findOneBy({ barcode })
  
  return { data: target, code: 0, message: 'success' }
})

router.all('/add', async (ctx, next) => {
  const { name, barcode, producedDate, expirationDate, qualityGuaranteeDate, qualityGuaranteeDateUnit } = ctx.request.body as any;
  

  console.log(ctx.request.body);
  
  const sku = new Sku();
//   const appRepostory = AppDataSource.getRepository(Sku);

  sku.name = name;
  sku.barcode = barcode;
  sku.produced_date = producedDate;
  sku.expiration_date = expirationDate;
  sku.quality_guarantee_date = qualityGuaranteeDate;
  sku.quality_gurantee_date_unit = qualityGuaranteeDateUnit;
  sku.pic = ''
  sku.creator_id = ''

  await AppDataSource.manager.save(sku)

  ctx.body = { data: null, code: 0, message: 'success' }
  
  await next()
})

export default router;