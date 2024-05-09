const { chromium } = require('playwright');

describe('Marquee Component', () => {
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

  test('Marquee should render correctly', async () => {
    const text = 'Hello, world!';
    await page.setContent(`<div id="root"></div>`); // Reset content with an empty div
    await page.evaluate(text => {
      const Marquee = require('./Marquee').default;
      const React = require('react');
      const ReactDOM = require('react-dom');
      ReactDOM.render(React.createElement(Marquee, { text }), document.getElementById('root'));
    }, text);
    await page.waitForSelector('.marquee-container');

    const marquee = await page.$('.marquee-container');
    expect(marquee).toBeTruthy();

    const marqueeText = await marquee.$('.marquee-text');
    expect(marqueeText).toBeTruthy();
    const textContent = await marqueeText.textContent();
    expect(textContent).toBe(text);
  });

  test('Marquee styles should be applied correctly', async () => {
    await page.setContent(`<div id="root"></div>`); // Reset content with an empty div
    await page.evaluate(() => {
      const Marquee = require('./Marquee').default;
      const React = require('react');
      const ReactDOM = require('react-dom');
      ReactDOM.render(React.createElement(Marquee, { text: 'Test Text' }), document.getElementById('root'));
    });
    await page.waitForSelector('.marquee-container');

    const marquee = await page.$('.marquee-container');
    const marqueeText = await marquee.$('.marquee-text');

    const containerStyles = await marquee.evaluate(marquee => getComputedStyle(marquee));
    const textStyles = await marqueeText.evaluate(marqueeText => getComputedStyle(marqueeText));

    expect(containerStyles.overflow).toBe('hidden');
    expect(containerStyles.position).toBe('relative');
    expect(containerStyles.width).toBeTruthy(); // Width should not be empty

    expect(textStyles.whiteSpace).toBe('nowrap');
    expect(textStyles.position).toBe('absolute');
    expect(textStyles.animation).toBeTruthy(); // Animation should be applied
  });
});
