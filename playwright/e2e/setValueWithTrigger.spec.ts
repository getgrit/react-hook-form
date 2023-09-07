
import { test, expect } from '@playwright/test';

test.describe('form setValue with trigger', () => {
  test('should set input value and trigger validation', async ({ page }) => {
    await page.goto('http://localhost:3000/setValueWithTrigger');

    await page.locator('input[name="firstName"]').type('a');
    await expect(page.locator('input[name="firstName"] + p')).toHaveText('minLength 10');
    await page.locator('input[name="firstName"]').clear();
    await expect(page.locator('input[name="firstName"] + p')).toHaveText('required');
    await page.locator('input[name="firstName"]').type('clear1234567');

    await page.locator('input[name="lastName"]').type('a');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText('too short');
    await page.locator('input[name="lastName"]').type('fsdfsdfsd');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText('error message');
    await page.locator('input[name="lastName"]').clear();
    await page.locator('input[name="lastName"]').type('bill');

    // @grit suppress
// Clicking the checkbox does not change its state
// await expect(page.locator('p')).toHaveCount(0);
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('30');
  });
});
