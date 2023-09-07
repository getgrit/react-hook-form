
import { test, expect } from '@playwright/test';

test.describe('isValid', () => {
  test('should showing valid correctly with build in validation', async ({ page }) => {
    await page.goto('http://localhost:3000/isValid/build-in/defaultValue');
    await expect(page.locator('#isValid')).toHaveText('false');

    await page.locator('input[name="firstName"]').type('test');
    await expect(page.locator('#isValid')).toHaveText('false');
    await page.locator('input[name="lastName"]').type('test');
    await expect(page.locator('#isValid')).toHaveText('true');
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('3');
    await page.locator('#toggle').click();
    await expect(page.locator('#isValid')).toHaveText('false');
    await page.locator('#toggle').click();
    await expect(page.locator('#isValid')).toHaveText('true');
  });

  test('should showing valid correctly with build in validation and default values supplied', async ({ page }) => {
    await page.goto('http://localhost:3000/isValid/build-in/defaultValues');
    await expect(page.locator('#isValid')).toHaveText('true');

    await page.locator('input[name="firstName"]').clear();
    await expect(page.locator('#isValid')).toHaveText('false');
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('4');
    await page.locator('#toggle').click();
    await expect(page.locator('#isValid')).toHaveText('false');
  });

  test('should showing valid correctly with schema validation', async ({ page }) => {
    await page.goto('http://localhost:3000/isValid/schema/defaultValue');
    await expect(page.locator('#isValid')).toHaveText('false');

    await page.locator('input[name="firstName"]').type('test');
    await expect(page.locator('#isValid')).toHaveText('false');
    await page.locator('input[name="lastName"]').type('test');
    await expect(page.locator('#isValid')).toHaveText('true');
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('2');
    await page.locator('#toggle').click();
    await expect(page.locator('#isValid')).toHaveText('false');
    await page.locator('#toggle').click();
    await page.locator('input[name="firstName"]').type('test');
    await expect(page.locator('#isValid')).toHaveText('true');
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('7');
  });

  test('should showing valid correctly with schema validation and default value supplied', async ({ page }) => {
    await page.goto('http://localhost:3000/isValid/schema/defaultValues');
    await expect(page.locator('#isValid')).toHaveText('true');

    await page.locator('input[name="firstName"]').clear();
    await expect(page.locator('#isValid')).toHaveText('false');
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('3');
    await page.locator('input[name="firstName"]').type('test');
    await expect(page.locator('#isValid')).toHaveText('true');
    await page.locator('#toggle').click();
    await expect(page.locator('#isValid')).toHaveText('false');
    await page.locator('#toggle').click();
    await page.locator('input[name="firstName"]').type('t');
    await expect(page.locator('#isValid')).toHaveText('true');
  });
});
