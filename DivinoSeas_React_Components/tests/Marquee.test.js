const { test, expect } = require('@playwright/test');

test.describe('Marquee component', () => {
  test('should render the marquee text correctly', async ({ page }) => {
    // Navega a la página donde está el componente Marquee
    await page.goto('http://localhost:5173');

    // Verifica que el texto se renderiza correctamente
    const marqueeText = await page.locator('.marquee-text');
    await expect(marqueeText).toHaveText('Welcome to Divino Seas'); 
  });
});
test.describe('Marquee component', () => {
    test('should render the marquee container and be visible', async ({ page }) => {
      // Navega a la página donde está el componente Marquee
      await page.goto('http://localhost:5173');
  
      // Verifica que el contenedor del marquee es visible
      const marqueeContainer = await page.locator('.marquee-container');
      await expect(marqueeContainer).toBeVisible();
    });
  });
  