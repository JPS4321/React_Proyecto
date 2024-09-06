const { test, expect } = require('@playwright/test');

test.describe('RangeSlider Component', () => {

  test('should update the min and max values correctly when using the slider', async ({ page }) => {
    await page.goto('http://localhost:5173/collections/women');

    // Cambia el valor mínimo en el slider
    const minSlider = await page.locator('input[type="range"]').first();
    await minSlider.fill('200'); // Cambia el valor mínimo a 200
    await minSlider.dispatchEvent('mouseup'); // Simula el evento de fin de ajuste

    // Cambia el valor máximo en el slider
    const maxSlider = await page.locator('input[type="range"]').last();
    await maxSlider.fill('800'); // Cambia el valor máximo a 800
    await maxSlider.dispatchEvent('mouseup');

    // Verifica que los valores se hayan actualizado correctamente
    const minInput = await page.locator('input.range-input').first();
    const maxInput = await page.locator('input.range-input').last();
    await expect(minInput).toHaveValue('200');
    await expect(maxInput).toHaveValue('800');
  });



  test('should update the slider values when changing the numeric inputs', async ({ page }) => {
    await page.goto('http://localhost:5173/collections/women');

    // Cambia el valor en el input mínimo
    const minInput = await page.locator('input.range-input').first();
    await minInput.fill('100');
    await minInput.dispatchEvent('blur');

    // Verifica que el slider mínimo refleje el cambio
    const minSlider = await page.locator('input[type="range"]').first();
    await expect(minSlider).toHaveValue('100');

    // Cambia el valor en el input máximo
    const maxInput = await page.locator('input.range-input').last();
    await maxInput.fill('500');
    await maxInput.dispatchEvent('blur');

    // Verifica que el slider máximo refleje el cambio
    const maxSlider = await page.locator('input[type="range"]').last();
    await expect(maxSlider).toHaveValue('500');
  });

});
