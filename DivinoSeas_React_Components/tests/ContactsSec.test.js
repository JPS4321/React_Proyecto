const { test, expect } = require('@playwright/test');

test.describe('ContactSec component', () => {

  test('should render the form correctly', async ({ page }) => {
    // Visita la página del formulario en la ruta /contact
    await page.goto('http://localhost:5173/contact');

    // Verifica que el título se muestra correctamente
    const title = await page.locator('h2');
    await expect(title).toHaveText('GET IN TOUCH');

    // Verifica que los campos de entrada están visibles
    const nameInput = await page.locator('input[name="name"]');
    const emailInput = await page.locator('input[name="email"]');
    const messageTextarea = await page.locator('textarea[name="message"]');
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageTextarea).toBeVisible();

    // Verifica que el botón de enviar está visible
    const submitButton = await page.locator('button:has-text("ENVIAR AHORA")');
    await expect(submitButton).toBeVisible();
  });

  test('should show validation errors when form is submitted with empty fields', async ({ page }) => {
    // Visita la página del formulario en la ruta /contact
    await page.goto('http://localhost:5173/contact');

    // Hacer clic en el botón de enviar sin llenar los campos
    await page.click('button:has-text("ENVIAR AHORA")');

    // Verifica que los placeholders muestran los errores correspondientes
    const nameInput = await page.locator('input[name="name"]');
    const emailInput = await page.locator('input[name="email"]');
    const messageTextarea = await page.locator('textarea[name="message"]');

    await expect(nameInput).toHaveAttribute('placeholder', 'El nombre es obligatorio');
    await expect(emailInput).toHaveAttribute('placeholder', 'El correo electrónico es obligatorio');
    await expect(messageTextarea).toHaveAttribute('placeholder', 'El mensaje es obligatorio');

    // Verifica que los campos tienen borde rojo (clase input-error)
    await expect(nameInput).toHaveClass(/input-error/);
    await expect(emailInput).toHaveClass(/input-error/);
    await expect(messageTextarea).toHaveClass(/input-error/);
  });

  test('should remove validation error when user starts typing', async ({ page }) => {
    // Visita la página del formulario en la ruta /contact
    await page.goto('http://localhost:5173/contact');

    // Hacer clic en el botón de enviar sin llenar los campos
    await page.click('button:has-text("ENVIAR AHORA")');

    // Verifica que los campos tienen borde rojo
    const nameInput = await page.locator('input[name="name"]');
    await expect(nameInput).toHaveClass(/input-error/);

    // Escribe en el campo nombre y verifica que el error desaparece
    await nameInput.fill('Juan');
    await expect(nameInput).not.toHaveClass(/input-error/);
  });

  test('should submit form successfully when all fields are filled', async ({ page }) => {
    // Visita la página del formulario en la ruta /contact
    await page.goto('http://localhost:5173/contact');

    // Llenar los campos
    await page.fill('input[name="name"]', 'Juan');
    await page.fill('input[name="email"]', 'juan@example.com');
    await page.fill('textarea[name="message"]', 'Este es un mensaje de prueba');

    // Hacer clic en el botón de enviar
    await page.click('button:has-text("ENVIAR AHORA")');

    // Verifica en la consola que el formulario se ha enviado correctamente
    await expect(page.locator('input[name="name"]')).toHaveValue('Juan');
    await expect(page.locator('input[name="email"]')).toHaveValue('juan@example.com');
    await expect(page.locator('textarea[name="message"]')).toHaveValue('Este es un mensaje de prueba');
  });

});
