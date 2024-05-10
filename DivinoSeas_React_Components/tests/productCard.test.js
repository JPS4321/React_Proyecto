const { test, expect } = require('@playwright/test');

test('ProductCard component renders correctly', async ({ page }) => {

  const imageSrc = 'https://example.com/product-image.jpg';
  const title = 'Product Name';
  const price = 29.99;


  await page.setContent(`<div><ProductCard 
  imageSrc="${imageSrc}" 
  title="${title}" 
  price="${price}" />
  </div>`);

  // Check for the product card element
  const productCard = await page.locator('div', { hasText: title }); 
  await expect(productCard).toBeVisible();

  // Check for the product image
  const productImage = await productCard.locator('img');
  await expect(productImage).toBeVisible();
  await expect(productImage).toHaveAttribute('src', imageSrc); 

  // Check for the product title
  const productTitle = await productCard.locator('h2');
  await expect(productTitle).toBeVisible();
  await expect(productTitle).textContent().toBe(title);

  // Check for the product price
  const productPrice = await productCard.locator('p');
  await expect(productPrice).toBeVisible();
  await expect(productPrice).textContent().toContain(`${price}`); 
});
