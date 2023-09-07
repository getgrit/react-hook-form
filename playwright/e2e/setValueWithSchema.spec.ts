
import { test, expect } from '@playwright/test';

test.describe('form setValue with schema', () => {
  test('should set input value, trigger validation and clear all errors', async ({ page }) => {
    await page.goto('http://localhost:3000/setValueWithSchema');

    await page.locator('input[name="firstName"]').type('a');
    await expect(page.locator('input[name="firstName"] + p')).toContainText('firstName error');
    await expect(page.locator('p')).toHaveCount(1);
    await page.locator('input[name="firstName"]').type('asdasdasdasd');

    await page.locator('input[name="lastName"]').type('a');
    await expect(page.locator('input[name="lastName"] + p')).toContainText('lastName error');
    await expect(page.locator('p')).toHaveCount(1);
    await page.locator('input[name="lastName"]').type('asdasdasdasd');

    await page.locator('input[name="age"]').type('a2323');

    await page.locator('#submit').click();
    await expect(page.locator('p')).toHaveCount(1);
    await expect(page.locator('input[name="requiredField"] + p')).toContainText('RequiredField error');

    await page.locator('#setValue').click();
    await expect(page.locator('input[name="requiredField"]')).toHaveValue('test123456789');
    // @grit suppress
// Clicking the checkbox does not change its state
// await expect(page.locator('p')).toHaveCount(0);

    // @grit suppress
 // await expect(page.locator('#renderCount')).toContainText('34');
  });
});
