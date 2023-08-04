import { expect, test } from '@playwright/test';

test.describe('basicSchemaValidation form validation', () => {
  test('should validate the form with onSubmit mode', async ({ page }) => {
    await page.goto('http://localhost:3000/basic-schema-validation/onSubmit');
    await page.locator('button').click();

    const firstNameInput = page.locator('input[name="firstName"]');
    await firstNameInput.click(); // this ensures the input is focused

    const isFocused = await page.evaluate(
      (input) => document.activeElement === input,
      await firstNameInput.elementHandle(),
    );

    expect(isFocused).toBe(true);
    await expect(page.locator('input[name="firstName"] + p')).toContainText(
      'firstName error',
    );
    await expect(page.locator('input[name="lastName"] + p')).toContainText(
      'lastName error',
    );
    await expect(page.locator('select[name="selectNumber"] + p')).toContainText(
      'selectNumber error',
    );
    await expect(
      page.locator('input[name="minRequiredLength"] + p'),
    ).toContainText('minRequiredLength error');
    await expect(page.locator('input[name="radio"] + p')).toContainText(
      'radio error',
    );

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
    await expect(page.locator('input[name="minLength"] + p')).toContainText(
      'minLength error',
    );
    await expect(page.locator('input[name="pattern"] + p')).toContainText(
      'pattern error',
    );
    await expect(page.locator('input[name="min"] + p')).toContainText(
      'min error',
    );
    await expect(page.locator('input[name="max"] + p')).toContainText(
      'max error',
    );
    await expect(page.locator('input[name="minDate"] + p')).toContainText(
      'minDate error',
    );
    await expect(page.locator('input[name="maxDate"] + p')).toContainText(
      'maxDate error',
    );

    await page.locator('input[name="pattern"]').fill('23');
    await page.locator('input[name="minLength"]').fill('bi');
    await page.locator('input[name="minRequiredLength"]').fill('bi');
    await page.locator('input[name="radio"][value="1"]').check();
    await page.locator('input[name="min"]').fill('11');
    await page.locator('input[name="max"]').fill('19');
    await page.locator('input[name="minDate"]').fill('2019-08-01');
    await page.locator('input[name="maxDate"]').fill('2019-08-01');
    await page.locator('input[name="checkbox"]').check();

    await expect(page.locator('p')).toHaveCount(0);
    // await expect(page.locator('#renderCount')).toContainText('24');
  });

  test('should validate the form with onBlur mode', async ({ page }) => {
    await page.goto('http://localhost:3000/basic-schema-validation/onBlur');

    await page.locator('input[name="firstName"]').click();
    await page.locator('input[name="firstName"]').blur();
    await expect(page.locator('input[name="firstName"] + p')).toContainText(
      'firstName error',
    );
    await page.locator('input[name="firstName"]').fill('bill');
    await page.locator('input[name="lastName"]').click();
    await page.locator('input[name="lastName"]').blur();
    await expect(page.locator('input[name="lastName"] + p')).toContainText(
      'lastName error',
    );
    await page.locator('input[name="lastName"]').fill('luo123456');
    await page.locator('input[name="lastName"]').blur();
    await expect(page.locator('input[name="lastName"] + p')).toContainText(
      'lastName error',
    );
    await page.locator('select[name="selectNumber"]').click();
    await page.locator('select[name="selectNumber"]').blur();
    await expect(page.locator('select[name="selectNumber"] + p')).toContainText(
      'selectNumber error',
    );
    await page.locator('select[name="selectNumber"]').selectOption('1');
    await page.locator('input[name="pattern"]').fill('luo');
    await page.locator('input[name="min"]').fill('1');
    await page.locator('input[name="max"]').fill('21');
    await page.locator('input[name="minDate"]').fill('2019-07-30');
    await page.locator('input[name="maxDate"]').fill('2019-08-02');
    await page.locator('input[name="lastName"]').fill('luo');
    await page.locator('input[name="minLength"]').fill('b');
    await page.locator('input[name="minLength"]').blur();

    await expect(page.locator('input[name="pattern"] + p')).toContainText(
      'pattern error',
    );
    await expect(page.locator('input[name="minLength"] + p')).toContainText(
      'minLength error',
    );
    await expect(page.locator('input[name="min"] + p')).toContainText(
      'min error',
    );
    await expect(page.locator('input[name="max"] + p')).toContainText(
      'max error',
    );
    await expect(page.locator('input[name="minDate"] + p')).toContainText(
      'minDate error',
    );
    await expect(page.locator('input[name="maxDate"] + p')).toContainText(
      'maxDate error',
    );

    await page.locator('input[name="pattern"]').fill('23');
    await page.locator('input[name="minLength"]').fill('bi');
    await page.locator('input[name="minRequiredLength"]').fill('bi');
    await page.locator('input[name="radio"]').first().click();
    await page.locator('input[name="lastName"]').blur();
    // await expect(page.locator('input[name="radio"] + p')).toContainText(
    //   'radio error',
    // );
    await page.locator('input[name="radio"][value="1"]').check();
    await page.locator('input[name="min"]').fill('11');
    await page.locator('input[name="max"]').fill('19');
    await page.locator('input[name="minDate"]').fill('2019-08-01');
    await page.locator('input[name="maxDate"]').fill('2019-08-01');
    await page.locator('input[name="checkbox"]').click();

    // await expect(page.locator('p')).toHaveCount(0);
    // await expect(page.locator('#renderCount')).toContainText('22');
  });

  test('should validate the form with onChange mode', async ({ page }) => {
    await page.goto('http://localhost:3000/basic-schema-validation/onChange');

    await page.locator('input[name="firstName"]').fill('bill');
    await page.locator('input[name="lastName"]').click();
    await page.locator('input[name="lastName"]').fill('luo123456');
    await page.locator('input[name="lastName"]').fill('');
    await expect(page.locator('input[name="lastName"] + p')).toContainText(
      'lastName error',
    );
    await page.locator('input[name="lastName"]').fill('luo123456');
    await expect(page.locator('input[name="lastName"] + p')).toContainText(
      'lastName error',
    );
    await page.locator('select[name="selectNumber"]').selectOption('1');
    await page.locator('select[name="selectNumber"]').selectOption('');
    await expect(page.locator('select[name="selectNumber"] + p')).toContainText(
      'selectNumber error',
    );
    await page.locator('select[name="selectNumber"]').selectOption('1');
    await page.locator('input[name="pattern"]').fill('luo');
    await page.locator('input[name="min"]').fill('1');
    await page.locator('input[name="max"]').fill('21');
    await page.locator('input[name="minDate"]').fill('2019-07-30');
    await page.locator('input[name="maxDate"]').fill('2019-08-02');
    await page.locator('input[name="lastName"]').fill('luo');
    await page.locator('input[name="minLength"]').fill('b');

    await expect(page.locator('input[name="pattern"] + p')).toContainText(
      'pattern error',
    );
    await expect(page.locator('input[name="minLength"] + p')).toContainText(
      'minLength error',
    );
    await expect(page.locator('input[name="min"] + p')).toContainText(
      'min error',
    );
    await expect(page.locator('input[name="max"] + p')).toContainText(
      'max error',
    );
    await expect(page.locator('input[name="minDate"] + p')).toContainText(
      'minDate error',
    );
    await expect(page.locator('input[name="maxDate"] + p')).toContainText(
      'maxDate error',
    );

    await page.locator('input[name="pattern"]').fill('23');
    await page.locator('input[name="minLength"]').fill('bi');
    await page.locator('input[name="minRequiredLength"]').fill('bi');
    await page.locator('input[name="radio"]').first().click();
    await page.locator('input[name="radio"][value="1"]').check();
    await page.locator('input[name="min"]').fill('11');
    await page.locator('input[name="max"]').fill('19');
    await page.locator('input[name="minDate"]').fill('2019-08-01');
    await page.locator('input[name="maxDate"]').fill('2019-08-01');
    await page.locator('input[name="checkbox"]').check();

    await expect(page.locator('p')).toHaveCount(0);
    // await expect(page.locator('#renderCount')).toContainText('26');
  });
});
