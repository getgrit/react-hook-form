import { test, expect } from '@playwright/test';

test.describe('form setValueAsyncStrictMode', () => {
  test('should set async input value correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/setValueAsyncStrictMode');

    await page.waitForTimeout(10);

    await page.locator('#submit').click();

    await expect(page.locator('p')).toHaveText('["test","A","B","C","D"]');
  });
});
