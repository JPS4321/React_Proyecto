const { test, expect } = require('@playwright/test');

test.describe('ShoppingCart component', () => {
  test.beforeEach(async ({ page }) => {
    // Navega a la página donde se renderiza el carrito de compras
    await page.goto('http://localhost:5173/ShoppingCart'); 
  });

  test('should render cart items with correct details', async ({ page }) => {
    // Verifica que los nombres de los items se renderizan correctamente
    const item1Name = page.locator('.cart-item-name:has-text("Item 1")');
    const item2Name = page.locator('.cart-item-name:has-text("Item 2")');
    const item3Name = page.locator('.cart-item-name:has-text("Item 3")');

    // Verifica que los precios se renderizan correctamente
    const item1Price = page.locator('.cart-item-price').nth(0); // Primer precio
    const item2Price = page.locator('.cart-item-price').nth(1); // Segundo precio
    const item3Price = page.locator('.cart-item-price').nth(2); // Tercer precio

    // Verifica que las cantidades se renderizan correctamente
    const item1Quantity = page.locator('.quantity-value').nth(0);
    const item2Quantity = page.locator('.quantity-value').nth(1);
    const item3Quantity = page.locator('.quantity-value').nth(2);

    // Verifica que los nombres, precios y cantidades sean correctos
    await expect(item1Name).toBeVisible();
    await expect(item2Name).toBeVisible();
    await expect(item3Name).toBeVisible();

    await expect(item1Price).toHaveText('$50.00');
    await expect(item2Price).toHaveText('$75.00');
    await expect(item3Price).toHaveText('$75.00');

    await expect(item1Quantity).toHaveText('1');
    await expect(item2Quantity).toHaveText('1');
    await expect(item3Quantity).toHaveText('1');
  });

  test('should increment and decrement item quantity', async ({ page }) => {
    // Selecciona los botones de incremento y decremento del primer item
    const incrementButton = page.locator('.quantity-button', { hasText: '+' }).nth(0);
    const decrementButton = page.locator('.quantity-button', { hasText: '-' }).nth(0);

    await incrementButton.click();
    const quantityValue = page.locator('.quantity-value').nth(0);
    await expect(quantityValue).toHaveText('2'); // Supone que se incrementa en 1

    await decrementButton.click();
    await expect(quantityValue).toHaveText('1'); // Supone que regresa al valor inicial
  });

  test('should remove an item from the cart', async ({ page }) => {
    // Selecciona el botón de eliminar para el primer item
    const removeButton = page.locator('.remove-button').nth(0);

    // Haz clic en el botón de eliminar
    await removeButton.click();

    const item1 = page.locator('.cart-item-name:has-text("Item 1")');
    await expect(item1).not.toBeVisible();
  });

  test('should show correct total amount', async ({ page }) => {
    // Verifica que el total sea correcto inicialmente ($200.00)
    const totalAmount = page.locator('.total-section');
    await expect(totalAmount).toHaveText('Total: $200.00');
    
    // Incrementa la cantidad del primer ítem
    const incrementButton = page.locator('.quantity-button', { hasText: '+' }).nth(0);
    await incrementButton.click();

    // Verifica que el total haya cambiado después de incrementar el primer ítem ($250.00)
    await expect(totalAmount).toHaveText('Total: $250.00');
  });
});
