import { expect, test } from '@playwright/test';

test.describe('delayError', () => {
  test('should delay from errors appear', async ({ page }) => {
    await page.goto('http://localhost:3000/delayError');

    const firstInput = () => page.locator('input[name="first"]');
    const firstInputError = () => page.locator('input[name="first"] + p');
    const lastInput = () => page.locator('input[name="last"]');
    const lastInputError = () => page.locator('input[name="last"] + p');

    await firstInput().fill('123');
    await page.waitForTimeout(100);
    await expect(firstInputError()).toContainText('First too long.');

    await lastInput().fill('123567');
    await page.waitForTimeout(100);
    await expect(lastInputError()).toContainText('Last too long.');

    await lastInput().press('Tab');
    await page.locator('button').click();

    await firstInput().fill('123');
    await lastInput().fill('123567');

    await expect(firstInputError()).toContainText('First too long.');
    await expect(lastInputError()).toContainText('Last too long.');

    await firstInput().fill('1');
    await lastInput().fill('12');

    await lastInput().press('Tab');

    await expect(page.locator('p')).toHaveCount(0);

    await page.locator('button').click();

    await firstInput().fill('aa');
    await lastInput().fill('a');

    await expect(firstInputError()).toContainText('First too long.');
    await expect(lastInputError()).toContainText('Last too long.');

    await firstInput().fill('1');
    await lastInput().fill('12');

    await lastInput().press('Tab');

    await expect(page.locator('p')).toHaveCount(0);
  });
});
