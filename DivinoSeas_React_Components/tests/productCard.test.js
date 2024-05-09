const { chromium } = require('playwright');

describe('ProductCard Component', () => {
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

  test('ProductCard should render correctly', async () => {
    const imageSrc = 'example.jpg';
    const title = 'Product Title';
    const price = 99.99;

    await page.setContent(`<div id="root"></div>`); // Reset content with an empty div
    await page.evaluate(({ imageSrc, title, price }) => {
      const ProductCard = require('./ProductCard').default;
      const React = require('react');
      const ReactDOM = require('react-dom');
      ReactDOM.render(React.createElement(ProductCard, { imageSrc, title, price }), document.getElementById('root'));
    }, { imageSrc, title, price });
    await page.waitForSelector('.product-card');

    const productCard = await page.$('.product-card');
    expect(productCard).toBeTruthy();

    const cardImage = await productCard.$('img');
    expect(cardImage).toBeTruthy();
    const imageSrcAttribute = await cardImage.getAttribute('src');
    expect(imageSrcAttribute).toBe(imageSrc);

    const titleElement = await productCard.$('h2');
    expect(titleElement).toBeTruthy();
    const titleText = await titleElement.textContent();
    expect(titleText).toBe(title);

    const priceElement = await productCard.$('p');
    expect(priceElement).toBeTruthy();
    const priceText = await priceElement.textContent();
    expect(priceText).toBe(`$${price}`);
  });

  test('ProductCard styles should be applied correctly', async () => {
    await page.setContent(`<div id="root"></div>`); // Reset content with an empty div
    await page.evaluate(() => {
      const ProductCard = require('./ProductCard').default;
      const React = require('react');
      const ReactDOM = require('react-dom');
      ReactDOM.render(React.createElement(ProductCard, {
        imageSrc: 'example.jpg',
        title: 'Product Title',
        price: 99.99
      }), document.getElementById('root'));
    });
    await page.waitForSelector('.product-card');

    const productCard = await page.$('.product-card');
    const cardStyles = await productCard.evaluate(productCard => getComputedStyle(productCard));

    expect(cardStyles.display).toBe('flex');
    expect(cardStyles.flexDirection).toBe('column');
    expect(cardStyles.alignItems).toBe('center');
    expect(cardStyles.border).toBe('1px solid #ccc');
    expect(cardStyles.borderRadius).toBe('8px');
    expect(cardStyles.padding).toBe('16px');
    expect(cardStyles.marginBottom).toBe('16px');
    expect(cardStyles.boxShadow).toBe('rgba(0, 0, 0, 0.1) 0px 2px 4px');
    
    const cardImage = await productCard.$('img');
    const imageStyles = await cardImage.evaluate(cardImage => getComputedStyle(cardImage));
    expect(imageStyles.width).toBe('100px');
    expect(imageStyles.height).toBe('100px');
    expect(imageStyles.objectFit).toBe('cover');
    expect(imageStyles.borderRadius).toBe('8px');
    expect(imageStyles.marginBottom).toBe('16px');

    const titleElement = await productCard.$('h2');
    const titleStyles = await titleElement.evaluate(titleElement => getComputedStyle(titleElement));
    expect(titleStyles.fontSize).toBe('18px');
    expect(titleStyles.fontWeight).toBe('bold');
    expect(titleStyles.marginBottom).toBe('8px');

    const priceElement = await productCard.$('p');
    const priceStyles = await priceElement.evaluate(priceElement => getComputedStyle(priceElement));
    expect(priceStyles.fontSize).toBe('16px');
    expect(priceStyles.color).toBe('rgb(85, 85, 85)');
  });
});
