const { test, expect } = require('@playwright/test');

test.describe('Collections Page', () => {

   
      

  test('should check and uncheck the "En existencia" and "Agotado" checkboxes', async ({ page }) => {
    // Navega a la página de colecciones
    await page.goto('http://localhost:5173/collections/women');

    // Expande el filtro de disponibilidad
    const availabilityHeader = await page.locator('text=Disponibilidad');
    await availabilityHeader.click();

    // Encuentra los checkboxes
    const inStockCheckbox = await page.locator('input[name="inStock"]');
    const outOfStockCheckbox = await page.locator('input[name="outOfStock"]');

    // Verifica que los checkboxes están desmarcados inicialmente
    await expect(inStockCheckbox).not.toBeChecked();
    await expect(outOfStockCheckbox).not.toBeChecked();

    // Haz clic en el checkbox "En existencia"
    await inStockCheckbox.check();
    await expect(inStockCheckbox).toBeChecked();

    // Haz clic en el checkbox "Agotado"
    await outOfStockCheckbox.check();
    await expect(outOfStockCheckbox).toBeChecked();

    // Desmarca los checkboxes
    await inStockCheckbox.uncheck();
    await expect(inStockCheckbox).not.toBeChecked();
    await outOfStockCheckbox.uncheck();
    await expect(outOfStockCheckbox).not.toBeChecked();
  });

  
  
  

});
