const { chromium } = require('playwright');

describe('Footer Component', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000'); // Change this URL if needed
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Footer should render correctly', async () => {
    await page.waitForSelector('footer');
    const footer = await page.$('footer');
    expect(footer).toBeTruthy();

    const columns = await footer.$$('.column');
    expect(columns.length).toBe(3); // Assuming there are 3 columns

    for (let column of columns) {
      const title = await column.$('h3');
      expect(title).toBeTruthy();

      const links = await column.$$('p');
      expect(links.length).toBeGreaterThan(0);
    }
  });

  test('Footer styles should be applied correctly', async () => {
    await page.waitForSelector('footer');
    const footer = await page.$('footer');
    const bgColor = await footer.evaluate(footer => getComputedStyle(footer).backgroundColor);
    const color = await footer.evaluate(footer => getComputedStyle(footer).color);
    const padding = await footer.evaluate(footer => getComputedStyle(footer).padding);
    const display = await footer.evaluate(footer => getComputedStyle(footer).display);
    const justifyContent = await footer.evaluate(footer => getComputedStyle(footer).justifyContent);
    expect(bgColor).toBe('rgb(0, 0, 0)');
    expect(color).toBe('rgb(255, 255, 255)');
    expect(padding).toBe('20px');
    expect(display).toBe('flex');
    expect(justifyContent).toBe('space-around');
    
    const columns = await footer.$$('.column');
    for (let column of columns) {
      const textAlign = await column.evaluate(column => getComputedStyle(column).textAlign);
      expect(textAlign).toBe('center');

      const fontSize = await column.$eval('h3', h3 => getComputedStyle(h3).fontSize);
      const marginBottom = await column.$eval('h3', h3 => getComputedStyle(h3).marginBottom);
      expect(fontSize).toBe('20px');
      expect(marginBottom).toBe('10px');
    }
  });
});
