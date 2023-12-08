import { expect, test } from '@playwright/test';

test.describe('form setError', () => {
  test('should contain 3 errors when page land', async ({ page }) => {
    await page.goto('http://localhost:3000/setError');

    await expect(page.locator('#error0')).toHaveText('0 wrong');
    await expect(page.locator('#error1')).toHaveText('1 wrong');
    await expect(page.locator('#error2')).toHaveText('2 wrong');
    await expect(page.locator('#error3')).toHaveText('3 test');
    await expect(page.locator('#error4')).toHaveText('4 required');
    await expect(page.locator('#error5')).toHaveText('5 minLength');
    await expect(page.locator('#error')).toHaveText(
      'testMessageThis is required.Minlength is 10This is requiredThis is minLength',
    );
  });

  test('should clear individual error', async ({ page }) => {
    await page.goto('http://localhost:3000/setError');

    await page.locator('#clear1').click();
    await page.locator('#clear2').click();
    await expect(page.locator('#error0')).toHaveText('0 wrong');
  });

  test('should clear an array of errors', async ({ page }) => {
    await page.goto('http://localhost:3000/setError');

    await page.locator('#clearArray').click();
    await expect(page.locator('#error0')).toHaveText('0 wrong');
  });

  test('should clear every errors', async ({ page }) => {
    await page.goto('http://localhost:3000/setError');

    await page.locator('#clear').click();
    await expect(page.locator('#errorContainer')).toHaveText('');
  });
});
