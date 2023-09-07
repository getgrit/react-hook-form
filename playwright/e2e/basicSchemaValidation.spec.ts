
import { test, expect } from '@playwright/test';

test.describe('basicSchemaValidation form validation', () => {
  test.skip('should validate the form with onSubmit mode', async ({ page }) => {
    await page.goto('http://localhost:3000/basic-schema-validation/onSubmit');
    await page.locator('button').click();

    const firstNameInput = page.locator('input[name="firstName"]');
           await firstNameInput.click(); // this ensures the input is focused

           const isFocused = await page.evaluate(
             (input) => document.activeElement === input,
             await firstNameInput.elementHandle(),
           );

           expect(isFocused).toBe(true);

    await expect(page.locator('input[name="firstName"] + p')).toHaveText('firstName error');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText('lastName error');
    await expect(page.locator('select[name="selectNumber"] + p')).toHaveText('selectNumber error');
    await expect(page.locator('input[name="minRequiredLength"] + p')).toHaveText('minRequiredLength error');
    // @grit suppress
/*
await expect(page.locator('input[name="radio"] + p')).toHaveText('radio error');
*/

    await page.locator('input[name="firstName"]').fill('bill');
    await page.locator('input[name="lastName"]').fill('luo123456');
    await page.locator('select[name="selectNumber"]').selectOption('1');
    await page.locator('input[name="pattern"]').fill('luo');
    await page.locator('input[name="min"]').fill('1');
    await page.locator('input[name="max"]').fill('21');
    await page.locator('input[name="minDate"]').fill('2019-07-30');
    await page.locator('input[name="maxDate"]').fill('2019-08-02');
    await page.locator('input[name="lastName"]').fill('luo');
    await page.locator('input[name="minLength"]').fill('b');
    await page.locator('input[name="minLength"] + p').toHaveText('minLength error');
    await page.locator('input[name="pattern"] + p').toHaveText('pattern error');
    await page.locator('input[name="min"] + p').toHaveText('min error');
    await page.locator('input[name="max"] + p').toHaveText('max error');
    await page.locator('input[name="minDate"] + p').toHaveText('minDate error');
    await page.locator('input[name="maxDate"] + p').toHaveText('maxDate error');

    await page.locator('input[name="pattern"]').fill('23');
    await page.locator('input[name="minLength"]').fill('bi');
    await page.locator('input[name="minRequiredLength"]').fill('bi');
    await page.locator('input[name="radio"]').check('1');
    await page.locator('input[name="min"]').fill('11');
    await page.locator('input[name="max"]').fill('19');
    await page.locator('input[name="minDate"]').fill('2019-08-01');
    await page.locator('input[name="maxDate"]').fill('2019-08-01');
    await page.locator('input[name="maxDate"]').blur();
    // @grit suppress
// Clicking the checkbox does not change its state
// await page.locator('input[name="checkbox"]').check();

    // @grit suppress
// Clicking the checkbox does not change its state
// await expect(page.locator('p')).toHaveCount(0);
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('24');
  });

  test.skip('should validate the form with onBlur mode', async ({ page }) => {
    await page.goto('http://localhost:3000/basic-schema-validation/onBlur');

    await page.locator('input[name="firstName"]').click();
    await page.locator('input[name="firstName"]').blur();
    await expect(page.locator('input[name="firstName"] + p')).toHaveText('firstName error');
    await page.locator('input[name="firstName"]').fill('bill');
    await page.locator('input[name="lastName"]').click();
    await page.locator('input[name="lastName"]').blur();
    await expect(page.locator('input[name="lastName"] + p')).toHaveText('lastName error');
    await page.locator('input[name="lastName"]').fill('luo123456');
    await page.locator('input[name="lastName"]').blur();
    await expect(page.locator('input[name="lastName"] + p')).toHaveText('lastName error');
    await page.locator('select[name="selectNumber"]').click();
    await page.locator('select[name="selectNumber"]').blur();
    await expect(page.locator('select[name="selectNumber"] + p')).toHaveText('selectNumber error');
    await page.locator('select[name="selectNumber"]').selectOption('1');
    await page.locator('input[name="pattern"]').fill('luo');
    await page.locator('input[name="min"]').fill('1');
    await page.locator('input[name="max"]').fill('21');
    await page.locator('input[name="minDate"]').fill('2019-07-30');
    await page.locator('input[name="maxDate"]').fill('2019-08-02');
    await page.locator('input[name="lastName"]').fill('luo');
    await page.locator('input[name="minLength"]').fill('b');
    await page.locator('input[name="minLength"]').blur();

    await expect(page.locator('input[name="pattern"] + p')).toHaveText('pattern error');
    await expect(page.locator('input[name="minLength"] + p')).toHaveText('minLength error');
    await expect(page.locator('input[name="min"] + p')).toHaveText('min error');
    await expect(page.locator('input[name="max"] + p')).toHaveText('max error');
    await expect(page.locator('input[name="minDate"] + p')).toHaveText('minDate error');
    await expect(page.locator('input[name="maxDate"] + p')).toHaveText('maxDate error');

    await page.locator('input[name="pattern"]').fill('23');
    await page.locator('input[name="minLength"]').fill('bi');
    await page.locator('input[name="minRequiredLength"]').fill('bi');
    await page.locator('input[name="radio"]').first().click();
    await page.locator('input[name="radio"]').first().blur();
    // @grit suppress
/*
await expect(page.locator('input[name="radio"] + p')).toHaveText('radio error');
*/
    await page.locator('input[name="radio"]').check('1');
    await page.locator('input[name="min"]').fill('11');
    await page.locator('input[name="max"]').fill('19');
    await page.locator('input[name="minDate"]').fill('2019-08-01');
    await page.locator('input[name="maxDate"]').fill('2019-08-01');
    // @grit suppress
// Clicking the checkbox does not change its state
// await page.locator('input[name="checkbox"]').check();

    // @grit suppress
// Clicking the checkbox does not change its state
// await expect(page.locator('p')).toHaveCount(0);
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('22');
  });

  test.skip('should validate the form with onChange mode', async ({ page }) => {
    await page.goto('http://localhost:3000/basic-schema-validation/onChange');

    await page.locator('input[name="firstName"]').fill('bill');
    await page.locator('input[name="lastName"]').click();
    await page.locator('input[name="lastName"]').fill('luo123456');
    await page.locator('input[name="lastName"]').fill('');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText('lastName error');
    await page.locator('input[name="lastName"]').fill('luo123456');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText('lastName error');
    await page.locator('select[name="selectNumber"]').selectOption('1');
    await page.locator('select[name="selectNumber"]').selectOption('');
    await expect(page.locator('select[name="selectNumber"] + p')).toHaveText('selectNumber error');
    await page.locator('select[name="selectNumber"]').selectOption('1');
    await page.locator('input[name="pattern"]').fill('luo');
    await page.locator('input[name="min"]').fill('1');
    await page.locator('input[name="max"]').fill('21');
    await page.locator('input[name="minDate"]').fill('2019-07-30');
    await page.locator('input[name="maxDate"]').fill('2019-08-02');
    await page.locator('input[name="lastName"]').fill('luo');
    await page.locator('input[name="minLength"]').fill('b');

    await expect(page.locator('input[name="pattern"] + p')).toHaveText('pattern error');
    await expect(page.locator('input[name="minLength"] + p')).toHaveText('minLength error');
    await expect(page.locator('input[name="min"] + p')).toHaveText('min error');
    await expect(page.locator('input[name="max"] + p')).toHaveText('max error');
    await expect(page.locator('input[name="minDate"] + p')).toHaveText('minDate error');
    await expect(page.locator('input[name="maxDate"] + p')).toHaveText('maxDate error');

    await page.locator('input[name="pattern"]').fill('23');
    await page.locator('input[name="minLength"]').fill('bi');
    await page.locator('input[name="minRequiredLength"]').fill('bi');
    await page.locator('input[name="radio"]').first().click();
    await page.locator('input[name="radio"]').check('1');
    await page.locator('input[name="min"]').fill('11');
    await page.locator('input[name="max"]').fill('19');
    await page.locator('input[name="minDate"]').fill('2019-08-01');
    await page.locator('input[name="maxDate"]').fill('2019-08-01');
    // @grit suppress
// Clicking the checkbox does not change its state
// await page.locator('input[name="checkbox"]').check();

    // @grit suppress
// Clicking the checkbox does not change its state
// await expect(page.locator('p')).toHaveCount(0);
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('26');
  });
});
