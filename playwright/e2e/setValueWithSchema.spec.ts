import { expect, test } from '@playwright/test';

test.describe('form setValue with schema', () => {
  test('should set input value, trigger validation and clear all errors', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/setValueWithSchema');

    await page.locator('input[name="firstName"]').type('a');
    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'firstName error',
    );
    await expect(page.locator('p')).toHaveCount(1);
    await page.locator('input[name="firstName"]').type('asdasdasdasd');

    await page.locator('input[name="lastName"]').type('a');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'lastName error',
    );
    await expect(page.locator('p')).toHaveCount(1);
    await page.locator('input[name="lastName"]').type('asdasdasdasd');

    await page.locator('input[name="age"]').type('a2323');

    await page.locator('#submit').click();
    await expect(page.locator('p')).toHaveCount(1);
    await expect(page.locator('input[name="requiredField"] + p')).toHaveText(
      'RequiredField error',
    );

    await page.locator('#setValue').click();
    await expect(page.locator('input[name="requiredField"]')).toHaveValue(
      'test123456789',
    );
    await expect(page.locator('p')).toHaveCount(0);

    await expect(page.locator('#renderCount')).toHaveText('34');
  });
});
