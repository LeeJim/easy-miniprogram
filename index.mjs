import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import { log } from 'console';
import fs from 'fs'

const domain = 'https://www.gds.org.cn';

// const str = '雀巢(中国)有限公司雀巢咖啡 高度：163毫米 宽度：73毫米 深度：60毫米 毛重：176克 净含量： 该企业暂未开通数据应用';

// const res = str.split(' ')

// log(res);


(async () => {
  const res = {};
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: true,
    args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    ],
    });
  const page = await browser.newPage();

  // // Navigate the page to a URL
  // await page.goto('https://www.gds.org.cn/#/barcodeList/index?type=barcode&keyword=6917878036526');

  // // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // // Type into search box
  // // await page.type('.devsite-search-field', 'automate beyond recorder');

  // // Wait and click on first result
  // // const searchResultSelector = '.devsite-result-item-link';
  // // await page.waitForSelector(searchResultSelector);
  // // await page.click(searchResultSelector);

  // // Locate the full title with a unique string
  // await page.waitForSelector(
  //   '.el-image img'
  // );

  // const body = await page.content();

  // fs.writeFileSync('./cache.html', body, { encoding: 'utf-8'})

  const body = fs.readFileSync('./cache.html', { encoding: 'utf-8'})

  const $ = cheerio.load(body);

  res.image = $('.el-image img').attr('src')
  res.name = $('.lineTwoEllipsis.proName.text-link').text();
  // const links = $('.pro_otherInfo-item a');
  const texts = $('.attr-value.text-attr');

  texts.each((index, item) => {
    const txt = texts.eq(index).text();
    if (index === 0) {
      res.company = txt;
    } else if (index === 1) {
      res.band = txt;
    } else if (index === 2) {
      const size = txt.split(' ');
      size.forEach((item, index) => {
        if (item.startsWith('高度')) {
          res.height = item.split('：')[1]
        } else if (item.startsWith('宽度')) {
          res.width = item.split('：')[1]
        } else if (item.startsWith('深度')) {
          res.depth = item.split('：')[1]
        } else if (item.startsWith('毛重')) {
          res.grossWeight = item.split('：')[1]
        }
      })
    }
  })

  log(res)
  
  // console.log(links.eq(2).attr('href'));

  // await page.goto(domain + links.eq(2).attr('href'));

  // const detailBody = await page.content();

  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // // const detailBody = fs.readFileSync('./detail.html', { encoding: 'utf-8'})

  // const detail_$ = cheerio.load(detailBody);

  // const tds = detail_$('.product_content td');

  // for(let i = 0; i < tds.length; i++) {
  //   const text = tds.eq(i).text();

  //   if (text.startsWith('品牌名称')) {
  //     res.brand = tds.eq(i+1).text();
  //     i++;
  //   }
  //   if (text.startsWith('产品分类')) {
  //     res.category = tds.eq(i+1).text();
  //     i++
  //   }
  //   if (text.startsWith('规格')) {
  //     res.standard = tds.eq(i+1).text();
  //     i++
  //   }
  //   if (text.startsWith('净含量')) {
  //     res.newWeight = tds.eq(i+1).text();
  //     i++
  //   }
  //   if (text.startsWith('上市日期')) {
  //     res.listingData = tds.eq(i+1).text();
  //     i++
  //   }
  // }

  await browser.close();
})();