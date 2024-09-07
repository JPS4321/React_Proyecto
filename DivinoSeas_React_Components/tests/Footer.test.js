const { test, expect } = require('@playwright/test');

test.describe('Footer component', () => {
  test('should render the footer with correct sections and content', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Verifica que el título "Contacto" esté visible
    const contactTitle = await page.locator('h3:has-text("Contacto")');
    await expect(contactTitle).toBeVisible();

    // Verifica el contenido de la sección "Contacto"
    const contactAddress = await page.locator('text=Dirección: 123 Street, City, Country');
    const contactPhone = await page.locator('text=Teléfono: +502 12345678');
    const contactEmail = await page.locator('text=Correo: example@example.com');
    await expect(contactAddress).toBeVisible();
    await expect(contactPhone).toBeVisible();
    await expect(contactEmail).toBeVisible();

    // Verifica que el título "Dvino Seas" esté visible
    const dvinoSeasTitle = await page.locator('h3:has-text("Dvino Seas")');
    await expect(dvinoSeasTitle).toBeVisible();

    // Verifica el contenido de la sección "Dvino Seas"
    const aboutUs = await page.locator('text=Sobre Nostros');
    const ourServices = await page.locator('text=Nuestros Servicios');
    const privacyPolicy = await page.locator('text=Politica de Privacidad');
    await expect(aboutUs).toBeVisible();
    await expect(ourServices).toBeVisible();
    await expect(privacyPolicy).toBeVisible();

    // Verifica que el título "¡Siguenos!" esté visible
    const followUsTitle = await page.locator('h3:has-text("¡Siguenos!")');
    await expect(followUsTitle).toBeVisible();

    // Verifica el contenido de la sección "¡Siguenos!"
    const facebook = await page.locator('text=Facebook');
    const twitter = await page.locator('text="X"', { exact: true }); 
    const instagram = await page.locator('text=Instagram');
    await expect(facebook).toBeVisible();
    await expect(twitter).toBeVisible(); 
    await expect(instagram).toBeVisible();
  });



  test.describe('Footer component', () => {
    test('should display the correct social media links', async ({ page }) => {
      await page.goto('http://localhost:5173');
  
      const facebook = await page.locator('text=Facebook');
      const twitter = await page.locator('text="X"', { exact: true }); 
      const instagram = await page.locator('text=Instagram');
      
      await expect(facebook).toBeVisible();
      await expect(twitter).toBeVisible();
      await expect(instagram).toBeVisible();
    });
  });

});
