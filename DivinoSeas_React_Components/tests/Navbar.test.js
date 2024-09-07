const { test, expect } = require('@playwright/test');

test.describe('Navbar component', () => {
  test('should render the logo correctly', async ({ page }) => {
    // Navega a la página donde está el componente Navbar
    await page.goto('http://localhost:5173');

    // Verifica que el logo de la marca sea visible
    const logo = await page.locator('img[alt="DivinoSeas Logo"]');
    await expect(logo).toBeVisible();
  });
});
test.describe('Navbar component', () => {
    test('should render the navigation links correctly', async ({ page }) => {
      await page.goto('http://localhost:5173');
  
      // Verificar la visibilidad de los enlaces de navegación
      const homeLink = await page.locator('a:has-text("Home")');
      const aboutLink = await page.locator('a:has-text("About")');
      const contactLink = await page.locator('a:has-text("Contact")');
      const womenShopLink = await page.locator('a:has-text("Shop Women")');
      const coupleShopLink = await page.locator('a:has-text("Shop Couple")');
  
      await expect(homeLink).toBeVisible();
      await expect(aboutLink).toBeVisible();
      await expect(contactLink).toBeVisible();
      await expect(womenShopLink).toBeVisible();
      await expect(coupleShopLink).toBeVisible();
    });
  });


  
  test.describe('Navbar component', () => {
    test('should change search placeholder on focus and blur', async ({ page }) => {
      await page.goto('http://localhost:5173');
  
      const searchInput = await page.locator('.search-box input');
      await expect(searchInput).toHaveAttribute('placeholder', 'Search');
  
      await searchInput.focus();
      await expect(searchInput).toHaveAttribute('placeholder', '');
  
      await searchInput.blur();
      await expect(searchInput).toHaveAttribute('placeholder', 'Search');
    });
  });
  