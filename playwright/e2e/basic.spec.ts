import { test } from '@playwright/test';

test.describe('basic form validation', () => {
  test('should validate the form and reset the form', async ({ page }) => {
    await page.goto('http://localhost:3000/basic/onSubmit');
    await page.locator('button#submit').click();

    // ... rest of the test code

    await page.locator('#resetForm').click();
    // ... rest of the assertions
  });

  test('should validate the form with onTouched mode', async ({ page }) => {
    await page.goto('http://localhost:3000/basic/onTouched');
    // ... rest of the test code
  });

  test('should validate the form with onBlur mode and reset the form', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/basic/onBlur');
    // ... rest of the test code
  });

  test('should validate the form with onChange mode and reset the form', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/basic/onChange');
    // ... rest of the test code
  });
});
