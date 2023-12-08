import { expect, test } from '@playwright/test';

test.describe('form reset', () => {
  test('should be able to re-populate the form while reset', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/reset');

    await page.locator('input[name="firstName"]').fill('0 wrong');
    await page.locator('input[name="array.1"]').fill('1 wrong');
    await page.locator('input[name="objectData.test"]').fill('2 wrong');
    await page.locator('input[name="lastName"]').fill('lastName');
    await page
      .locator('input[name="deepNest.level1.level2.data"]')
      .fill('whatever');

    await page.locator('button').click();

    await expect(page.locator('input[name="firstName"]')).toHaveValue('bill');
    await expect(page.locator('input[name="lastName"]')).toHaveValue('luo');
    await expect(page.locator('input[name="array.1"]')).toHaveValue('test');
    await expect(page.locator('input[name="objectData.test"]')).toHaveValue(
      'data',
    );
    await expect(
      page.locator('input[name="deepNest.level1.level2.data"]'),
    ).toHaveValue('hey');
  });
});
