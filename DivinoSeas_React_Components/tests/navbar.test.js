const { test, expect } = require('@playwright/test');

test('Navbar component renders correctly', async ({ page }) => {
  // Assuming you have a mechanism to mount the Navbar component

  // Mount the Navbar component
  // (Replace this line with your actual mounting logic)
  await page.goto('http://localhost:5173/');

  // Check for the navbar element
  const navbar = await page.locator('.navbar2');
  await expect(navbar).toBeVisible();

  // Check for the logo image
  const logo = await page.locator('img.logo');
  await expect(logo).toBeVisible();

  // Check for navigation links
  const navigationLinks = await page.locator('ul a');
  await expect(navigationLinks.count()).toBe(6); // Adjust based on actual number of links

  const expectedLinks = ['Home', 'About', 'Contact', 'Shop Men', 'Shop Women', 'Shop Couple'];
  for (let i = 0; i < expectedLinks.length; i++) {
    const linkText = await navigationLinks.nth(i).textContent();
    await expect(linkText).toBe(expectedLinks[i]);
  }

  // Check for search box elements (optional)
  const searchBox = await page.locator('.search-box');
  await expect(searchBox).toBeVisible();

  const searchInput = await searchBox.locator('input[type="text"]');
  await expect(searchInput).toBeVisible();

  const searchIcon = await searchBox.locator('img');
  await expect(searchIcon).toBeVisible();
});
