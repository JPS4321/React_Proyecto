const { test, expect } = require('@playwright/test');



test.describe('ProductCard component', () => {
    test('should display discounted prices correctly on product cards', async ({ page }) => {
        await page.goto('http://localhost:5173/collections/women');
      
        // Localiza el producto con descuento y verifica que el precio esté correcto
        const discountedPrice = await page.locator('.card:has-text("Product 2") .discounted-price');
        await expect(discountedPrice).toHaveText('Q36.00'); // Verificar precio con descuento
      });
      
  });

  test.describe('ProductCard component', () => {
    test('should navigate to product details page when product card is clicked', async ({ page }) => {
        await page.goto('http://localhost:5173/collections/women');
      
        await page.locator('.card:has-text("Product 2")').click();
      
        // Verificar que la URL cambie a la página de detalles del producto
        await expect(page).toHaveURL(/\/products\/Product%202/);
      });
      
  });
  