const { chromium } = require('playwright');

describe('SimpleBanner Component', () => {
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

  test('SimpleBanner should render correctly', async () => {
    const backgroundImage = 'example.jpg';

    await page.setContent(`<div id="root"></div>`); // Reset content with an empty div
    await page.evaluate(backgroundImage => {
      const SimpleBanner = require('./SimpleBanner').default;
      const React = require('react');
      const ReactDOM = require('react-dom');
      ReactDOM.render(React.createElement(SimpleBanner, { backgroundImage }), document.getElementById('root'));
    }, backgroundImage);
    await page.waitForSelector('.simple-banner');

    const simpleBanner = await page.$('.simple-banner');
    expect(simpleBanner).toBeTruthy();

    const style = await simpleBanner.evaluate(simpleBanner => simpleBanner.getAttribute('style'));
    expect(style.includes(`background-image: url(${backgroundImage})`)).toBeTruthy();
  });

  test('SimpleBanner styles should be applied correctly', async () => {
    await page.setContent(`<div id="root"></div>`); // Reset content with an empty div
    await page.evaluate(() => {
      const SimpleBanner = require('./SimpleBanner').default;
      const React = require('react');
      const ReactDOM = require('react-dom');
      ReactDOM.render(React.createElement(SimpleBanner, { backgroundImage: 'example.jpg' }), document.getElementById('root'));
    });
    await page.waitForSelector('.simple-banner');

    const simpleBanner = await page.$('.simple-banner');
    const styles = await simpleBanner.evaluate(simpleBanner => getComputedStyle(simpleBanner));

    expect(styles.width).toBe('calc(100% - 10px)');
    expect(styles.overflow).toBe('hidden');
    expect(styles.backgroundSize).toBe('contain');
    expect(styles.backgroundRepeat).toBe('no-repeat');
    expect(styles.margin).toBe('0px auto');
    expect(styles.backgroundPosition).toBe('center');
    expect(styles.height).toBe('250px');
    expect(styles.display).toBe('flex');
    expect(styles.justifyContent).toBe('center');
    expect(styles.marginBottom).toBe('20px');
    expect(styles.alignItems).toBe('center');
    expect(styles.textAlign).toBe('center');
  });
});
