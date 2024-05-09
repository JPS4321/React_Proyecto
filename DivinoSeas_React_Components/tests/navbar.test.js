const { chromium } = require('playwright');

describe('Navbar Component', () => {
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

  test('Navbar should render correctly', async () => {
    await page.waitForSelector('.navbar2');
    const navbar = await page.$('.navbar2');
    expect(navbar).toBeTruthy();

    const logo = await navbar.$('.logo');
    expect(logo).toBeTruthy();

    const links = await navbar.$$('ul li');
    expect(links.length).toBe(6); // Assuming there are 6 links

    const searchBox = await navbar.$('.search-box');
    expect(searchBox).toBeTruthy();

    const input = await searchBox.$('input');
    expect(input).toBeTruthy();
    const inputValue = await input.getAttribute('placeholder');
    expect(inputValue).toBe('Search');
  });

  test('Navigation links should work', async () => {
    await page.waitForSelector('ul');
    const links = await page.$$('ul li a');
    
    for (let link of links) {
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
      await link.click();
      await page.waitForNavigation();
      // You can add more assertions for the page you navigate to if needed
    }
  });
});
