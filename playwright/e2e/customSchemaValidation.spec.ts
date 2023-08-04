import { test } from '@playwright/test';

test.describe('customSchemaValidation form validation', () => {
  test('should validate the form with onSubmit mode', async ({ page }) => {
    await page.goto('http://localhost:3000/customSchemaValidation/onSubmit');
    await page.locator('button').click();

    // ... (rest of the test code)
  });

  test('should validate the form with onBlur mode', async ({ page }) => {
    await page.goto('http://localhost:3000/customSchemaValidation/onBlur');

    // ... (rest of the test code)
  });

  test('should validate the form with onChange mode', async ({ page }) => {
    await page.goto('http://localhost:3000/customSchemaValidation/onChange');

    // ... (rest of the test code)
  });
});
