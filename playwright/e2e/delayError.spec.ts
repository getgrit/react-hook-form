
import { test, expect } from '@playwright/test';

test.describe('delayError', () => {
  test('should delay from errors appear', async ({ page }) => {
    await page.goto('http://localhost:3000/delayError');

    const firstInput = () => page.locator('input[name="first"]');
    const firstInputError = () => page.locator('input[name="first"] + p');
    const lastInput = () => page.locator('input[name="last"]');
    const lastInputError = () => page.locator('input[name="last"] + p');

    await firstInput().type('123');
    await page.waitForTimeout(100);
    await expect(firstInputError()).toHaveText('First too long.');

    await lastInput().type('123567');
    await page.waitForTimeout(100);
    await expect(lastInputError()).toHaveText('Last too long.');

    await lastInput().blur();
    await page.locator('button').click();

    await firstInput().type('123');
    await lastInput().type('123567');

    await expect(firstInputError()).toHaveText('First too long.');
    await expect(lastInputError()).toHaveText('Last too long.');

    await firstInput().fill('1');
    await lastInput().fill('12');

    await lastInput().blur();

    // @grit suppress
// Clicking the checkbox does not change its state
// await expect(page.locator('p')).toHaveCount(0);

    await page.locator('button').click();

    await firstInput().type('aa');
    await lastInput().type('a');

    await expect(firstInputError()).toHaveText('First too long.');
    await expect(lastInputError()).toHaveText('Last too long.');

    await firstInput().fill('1');
    await lastInput().fill('12');

    await lastInput().blur();

    // @grit suppress
// Clicking the checkbox does not change its state
// await expect(page.locator('p')).toHaveCount(0);
  });
});
