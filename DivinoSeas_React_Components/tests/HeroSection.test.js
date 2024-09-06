const { test, expect } = require('@playwright/test');

test.describe('HeroSection1 component', () => {
  test('should render both images correctly', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Verificar que las dos imágenes se renderizan
    const image1 = await page.locator('img[alt="Image 1"]');
    const image2 = await page.locator('img[alt="Image 2"]');

    await expect(image1).toBeVisible();
    await expect(image2).toBeVisible();
  });
});
test.describe('HeroSection1 component', () => {
    test('should render Black Box and White Box correctly', async ({ page }) => {
      await page.goto('http://localhost:5173');
  
      // Verificar que el texto "Black Box" y "White Box" se renderizan correctamente
      const blackBox = await page.locator('h2:has-text("Black Box")');
      const whiteBox = await page.locator('h2:has-text("White Box")');
  
      await expect(blackBox).toBeVisible();
      await expect(whiteBox).toBeVisible();
    });
  });
  test.describe('HeroSection1 component', () => {
    test('should apply the correct classes to Black Box and White Box', async ({ page }) => {
      await page.goto('http://localhost:5173');
  
      // Verificar que las clases se aplican correctamente a los elementos
      const blackBoxElement = await page.locator('.HeroSectionItem.BlackBox');
      const whiteBoxElement = await page.locator('.HeroSectionItem.WhiteBox');
  
      await expect(blackBoxElement).toBeVisible();
      await expect(whiteBoxElement).toBeVisible();
    });
  });
    