const { test, expect } = require('@playwright/test');

  test('Footer component renders correctly', async ({ page }) => {
  // Mount the Footer component (assuming you have a mechanism for this)
  await page.goto('http://localhost:5173/'); // Replace with your component mounting path

  // Check for footer element existence
  const footer = await page.locator('footer');
  await expect(footer).toBeVisible();

  // Check for content within footer sections
  const contactTitle = await page.locator('h3 >> text=Contact');
  await expect(contactTitle).toBeVisible();

  const companyTitle = await page.locator('h3 >> text=Company');
  await expect(companyTitle).toBeVisible();

  const followUsTitle = await page.locator('h3 >> text=Follow Us');
  await expect(followUsTitle).toBeVisible();
});