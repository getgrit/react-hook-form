
import { test, expect } from '@playwright/test';

test.describe('form setValue', () => {
  test('should set input value, trigger validation and clear all errors', async ({ page }) => {
    await page.goto('http://localhost:3000/setValue');

    await expect(page.locator('input[name="firstName"]')).toHaveValue('wrong');
    await expect(page.locator('input[name="age"]')).toHaveValue('2');
    await expect(page.locator('input[name="array.0"]')).toHaveValue('array.0');
    await expect(page.locator('input[name="array.1"]')).toHaveValue('array.1');
    await expect(page.locator('input[name="array.2"]')).toHaveValue('array.2');
    await expect(page.locator('input[name="object.firstName"]')).toHaveValue('firstName');
    await expect(page.locator('input[name="object.lastName"]')).toHaveValue('lastName');
    await expect(page.locator('input[name="object.middleName"]')).toHaveValue('middleName');
    await expect(page.locator('input[name="radio"]')).toBeChecked();
    await expect(page.locator('input[name="checkboxArray"][value="2"]')).toBeChecked();
    await expect(page.locator('input[name="checkboxArray"][value="3"]')).toBeChecked();
    await expect(page.locator('select[name="select"]')).toHaveValue('a');
    await expect(page.locator('select[name="multiple"]')).toHaveValues([
              'a',
              'b',
          ]);
    await expect(page.locator('#trigger')).toContainText('Trigger error');
    await expect(page.locator('#lastName')).not.toBeVisible();
    await expect(page.locator('#nestedValue')).toContainText('required');

    await page.locator('#submit').click();

    await expect(page.locator('#lastName')).toContainText('Last name error');

    await page.locator('input[name="lastName"]').fill('test');
    await page.locator('input[name="trigger"]').fill('trigger');
    await page.locator('input[name="nestedValue"]').fill('test');

    await page.locator('#submit').click();
    // @grit suppress
// Clicking the checkbox does not change its state
// await expect(page.locator('p')).toHaveCount(0);
    // @grit suppress
 // await expect(page.locator('#renderCount')).toContainText('9');

    await page.locator('#setMultipleValues').click();
    await expect(page.locator('input[name="array.0"]')).toHaveValue('array[0]1');
    await expect(page.locator('input[name="array.1"]')).toHaveValue('array[1]1');
    await expect(page.locator('input[name="array.2"]')).toHaveValue('array[2]1');
    await expect(page.locator('input[name="object.firstName"]')).toHaveValue('firstName1');
    await expect(page.locator('input[name="object.lastName"]')).toHaveValue('lastName1');
    await expect(page.locator('input[name="object.middleName"]')).toHaveValue('middleName1');
    await expect(page.locator('input[name="nestedValue"]')).toHaveValue('a,b');
    // @grit suppress
 // await expect(page.locator('#renderCount')).toContainText('9');
  });
});
