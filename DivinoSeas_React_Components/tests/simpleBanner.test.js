const { test, expect } = require('@playwright/test');

test('SimpleBanner component renders correctly', async ({ page }) => {

  const backgroundImage = 'https://example.com/banner-image.jpg';

  await page.setContent(`<div><SimpleBanner backgroundImage="${backgroundImage}" /></div>`);

  // Check for the banner element
  const banner = await page.locator('div');
  await expect(banner).toBeVisible();

  const bannerStyle = await banner.evaluate((el) => el.style.backgroundImage);
  await expect(bannerStyle).toContain(backgroundImage);

});
