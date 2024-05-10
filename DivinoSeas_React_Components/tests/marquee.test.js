const { test, expect } = require('@playwright/test');

test('Marquee component renders correctly and displays text', async ({ page }) => {

  const testText = 'Welcome to Divino Seas';

  // Mount the Marquee component with the text prop
  // (Replace this line with your actual mounting logic)
  await page.goto('http://localhost:5173/', { query: { text: testText } });

  // Check for the marquee container element
  const marqueeContainer = await page.locator('.marquee-container');
  await expect(marqueeContainer).toBeVisible();

  // Check for the marquee text element within the container
  const marqueeText = await marqueeContainer.locator('.marquee-text');
  await expect(marqueeText).toBeVisible();

  // Assert the displayed text content (optional)
  const displayedText = await marqueeText.textContent();
  await expect(displayedText).toBe(testText);
});
