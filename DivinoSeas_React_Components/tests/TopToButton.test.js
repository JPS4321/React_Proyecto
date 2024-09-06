import { test, expect } from '@playwright/test';

test.describe('ScrollToTopButton Component', () => {
  test('should render the scroll-to-top button and make it visible', async ({ page }) => {
    // Navegar a la página donde el componente ScrollToTopButton está presente
    await page.goto('http://localhost:5173');

    // Verificar que el botón está visible en la pantalla
    const scrollButton = await page.locator('.scroll-button');
    await expect(scrollButton).toBeVisible();
  });
});


test.describe('ScrollToTopButton Component', () => {
  test('should scroll to the top of the page when clicked', async ({ page }) => {
    // Navegar a la página donde el componente ScrollToTopButton está presente
    await page.goto('http://localhost:5173');

    // Simula un scroll hacia abajo en la página
    await page.evaluate(() => window.scrollTo(0, 1000));  // Simula hacer scroll hacia abajo

    // Hacer clic en el botón de scroll-to-top
    const scrollButton = await page.locator('.scroll-button');
    await scrollButton.click();

    // Verificar que la página ha hecho scroll hacia la parte superior
    await page.waitForTimeout(1000); // Espera un poco para la animación de scroll
    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBe(0); // Verificar que la página está en el tope
  });
});
