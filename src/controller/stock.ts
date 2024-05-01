import * as Router from 'koa-router'
import AppDataSource from '../data-source';
import { Sku } from '../entity';
import { session } from '../middleware';

const router = new Router({ prefix: '/stock' });

router.all('/add', session(), async (ctx, next) => {
  const { name, barcode, producedDate, expirationDate, qualityGuaranteeDate, qualityGuaranteeDateUnit, pic } = ctx.request.body as any;

  if (!ctx.state.sessionInfo) {
    ctx.body = { code: 401, message: 'need authorized'}
    await next();
    return;
  }
  
  const sku = new Sku();

  sku.name = name;
  sku.barcode = barcode;
  sku.produced_date = producedDate;
  sku.expiration_date = expirationDate;
  sku.quality_guarantee_date = qualityGuaranteeDate;
  sku.quality_gurantee_date_unit = qualityGuaranteeDateUnit;
  sku.pic = pic
  sku.creator_id = ctx.state.sessionInfo.openid;

  try {
    await AppDataSource.manager.save(sku)
    ctx.body = { data: null, code: 0, message: 'success' }
  } catch(e) {
    ctx.body = { data: null, code: 500, message: e.message }
  }
  
  await next()
})

export default router;
