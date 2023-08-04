import { test } from '@playwright/test';

test.describe('basicSchemaValidation form validation', () => {
  test('should validate the form with onSubmit mode', async ({ page }) => {
    await page.goto('http://localhost:3000/basic-schema-validation/onSubmit');
    await page.locator('button').click();

    // ... rest of the test code
  });

  test('should validate the form with onBlur mode', async ({ page }) => {
    await page.goto('http://localhost:3000/basic-schema-validation/onBlur');

    // ... rest of the test code
  });

  test('should validate the form with onChange mode', async ({ page }) => {
    await page.goto('http://localhost:3000/basic-schema-validation/onChange');

    // ... rest of the test code
  });
});
