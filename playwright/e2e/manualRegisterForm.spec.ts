import { expect, test } from '@playwright/test';

test.describe('manual register form validation', () => {
  test('should validate the form', async ({ page }) => {
    await page.goto('http://localhost:3000/manual-register-form');
    await page.locator('#submit').click();

    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'firstName error',
    );
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'lastName error',
    );
    await expect(page.locator('select[name="selectNumber"] + p')).toHaveText(
      'selectNumber error',
    );
    await expect(
      page.locator('input[name="minRequiredLength"] + p'),
    ).toHaveText('minRequiredLength error');
    await expect(page.locator('input[name="radio"] + p')).toHaveText(
      'radio error',
    );

    await page.locator('input[name="firstName"]').fill('bill');
    await page.locator('input[name="lastName"]').fill('luo123456');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'lastName error',
    );
    await page.locator('select[name="selectNumber"]').selectOption('1');
    await page.locator('input[name="pattern"]').fill('luo');
    await page.locator('input[name="min"]').fill('1');
    await page.locator('input[name="max"]').fill('21');
    await page.locator('input[name="minDate"]').fill('2019-07-30');
    await page.locator('input[name="maxDate"]').fill('2019-08-02');
    await page.locator('input[name="lastName"]').fill('');
    await page.locator('input[name="lastName"]').fill('luo');
    await page.locator('input[name="minLength"]').fill('b');

    await expect(page.locator('input[name="pattern"] + p')).toHaveText(
      'pattern error',
    );
    await expect(page.locator('input[name="minLength"] + p')).toHaveText(
      'minLength error',
    );
    await expect(page.locator('input[name="min"] + p')).toHaveText('min error');
    await expect(page.locator('input[name="max"] + p')).toHaveText('max error');
    await expect(page.locator('input[name="minDate"] + p')).toHaveText(
      'minDate error',
    );
    await expect(page.locator('input[name="maxDate"] + p')).toHaveText(
      'maxDate error',
    );

    await page.locator('input[name="pattern"]').fill('23');
    await page.locator('input[name="minLength"]').fill('bi');
    await page.locator('input[name="minRequiredLength"]').fill('bi');
    await page.locator('input[name="radio"]').check('1');
    await page.locator('input[name="min"]').fill('');
    await page.locator('input[name="min"]').fill('11');
    await page.locator('input[name="max"]').fill('');
    await page.locator('input[name="max"]').fill('19');
    await page.locator('input[name="minDate"]').fill('2019-08-01');
    await page.locator('input[name="maxDate"]').fill('2019-08-01');
    await page.locator('input[name="checkbox"]').check();

    await expect(page.locator('p')).toHaveCount(0);
    await expect(page.locator('#renderCount')).toHaveText('45');
  });
});
