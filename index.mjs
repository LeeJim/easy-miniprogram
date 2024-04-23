import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: true,
    args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    ],
    });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://www.gds.org.cn/#/barcodeList/index?type=barcode&keyword=6917878036526');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box
  // await page.type('.devsite-search-field', 'automate beyond recorder');

  // Wait and click on first result
  // const searchResultSelector = '.devsite-result-item-link';
  // await page.waitForSelector(searchResultSelector);
  // await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    '.pro_otherInfo-item .attr-value'
  );
  // const fullTitle = await textSelector?.evaluate(el => el.textContent);

  const body = await page.content();

  const $ = cheerio.load(body);

  const image = $('.el-image__inner').attr('class')
  const name = $('.lineTwoEllipsis.proName.text-link').text();
  const texts = $('.attr-value.text-attr');
  const companyName = texts.text();
  
  console.log(image);
  console.log(name);
  console.log(companyName);

  // Print the full title
  // console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
})();