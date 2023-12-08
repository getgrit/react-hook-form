import { expect, test } from '@playwright/test';

test.describe('form setValue with trigger', () => {
  test('should set input value and trigger validation', async ({ page }) => {
    await page.goto('http://localhost:3000/setValueWithTrigger');

    await page.locator('input[name="firstName"]').fill('a');
    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'minLength 10',
    );
    await page.locator('input[name="firstName"]').fill('');
    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'required',
    );
    await page.locator('input[name="firstName"]').fill('clear1234567');

    await page.locator('input[name="lastName"]').fill('a');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'too short',
    );
    await page.locator('input[name="lastName"]').fill('fsdfsdfsd');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'error message',
    );
    await page.locator('input[name="lastName"]').fill('');
    await page.locator('input[name="lastName"]').fill('bill');

    await expect(page.locator('p')).toHaveCount(0);
    await expect(page.locator('#renderCount')).toHaveText('30');
  });
});
