import { expect, test } from '@playwright/test';

test.describe('autoUnregister', () => {
  test('should keep all inputs data when inputs get unmounted', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/autoUnregister');
    await page.locator('input[name="test"]').fill('test');
    await page.locator('input[name="test1"]').fill('test1');
    await page.locator('input[name="test2"]').check();
    await page.locator('input[name="test3"]').check();
    await page.locator('select[name="test4"]').selectOption('Bill');
    await page.locator('#input-ReactSelect > div').click();
    await page.locator('#input-ReactSelect > div > div').nth(1).click();

    await page.locator('button').click();
    await page.locator('button').click();

    await expect(page.locator('input[name="test"]')).toHaveValue('test');
    await expect(page.locator('input[name="test1"]')).toHaveValue('test1');
    await expect(page.locator('input[name="test2"]')).toBeChecked();
    await expect(page.locator('input[name="test3"]')).toBeChecked();
    await expect(page.locator('select[name="test4"]')).toHaveValue('bill');
    await expect(
      page.locator('#input-ReactSelect > div > div > div > div'),
    ).toContainText('Strawberry');
  });
});
