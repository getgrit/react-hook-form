import { expect, test } from '@playwright/test';

test.describe('useFieldArrayNested', () => {
  test('should work correctly with nested field array', async ({ page }) => {
    await page.goto('http://localhost:3000/useFieldArrayNested');

    await page.locator('#nest-append-0').click();
    await page.locator('#nest-prepend-0').click();
    await page.locator('#nest-insert-0').click();
    await page.locator('#nest-swap-0').click();
    await page.locator('#nest-move-0').click();

    await expect(
      page.locator('input[name="test.0.keyValue.0.name"]'),
    ).toHaveValue('insert');
    await expect(
      page.locator('input[name="test.0.keyValue.1.name"]'),
    ).toHaveValue('prepend');
    await expect(
      page.locator('input[name="test.0.keyValue.2.name"]'),
    ).toHaveValue('1a');
    await expect(
      page.locator('input[name="test.0.keyValue.3.name"]'),
    ).toHaveValue('1c');
    await expect(
      page.locator('input[name="test.0.keyValue.4.name"]'),
    ).toHaveValue('append');

    await page.locator('#nest-remove-0').click();
    await expect(
      page.locator('input[name="test.0.keyValue.2.name"]'),
    ).toHaveValue('1c');
    await expect(
      page.locator('input[name="test.0.keyValue.3.name"]'),
    ).toHaveValue('append');

    // ... continue converting the rest of the test commands to Playwright
  });
});
