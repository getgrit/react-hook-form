import { expect, test } from '@playwright/test';

test.describe('validate field criteria', () => {
  test('should validate the form, show all errors and clear all', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/validate-field-criteria');
    await page.locator('button#submit').click();
    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'firstName required',
    );
    await page.locator('input[name="firstName"]').fill('te');
    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'firstName minLength',
    );
    await page.locator('input[name="firstName"]').fill('testtesttest');

    await expect(page.locator('input[name="min"] + p')).toHaveText(
      'min required',
    );
    await page.locator('input[name="min"]').fill('2');
    await expect(page.locator('input[name="min"] + p')).toHaveText('min min');
    await page.locator('input[name="min"]').fill('32');
    await expect(page.locator('input[name="min"] + p')).toHaveText('min max');
    await page.locator('input[name="min"]').fill('');
    await page.locator('input[name="min"]').fill('10');

    await expect(page.locator('input[name="minDate"] + p')).toHaveText(
      'minDate required',
    );
    await page.locator('input[name="minDate"]').fill('2019-07-01');
    await expect(page.locator('input[name="minDate"] + p')).toHaveText(
      'minDate min',
    );
    await page.locator('input[name="minDate"]').fill('2019-08-01');

    await expect(page.locator('input[name="maxDate"] + p')).toHaveText(
      'maxDate required',
    );
    await page.locator('input[name="maxDate"]').fill('2019-09-01');
    await expect(page.locator('input[name="maxDate"] + p')).toHaveText(
      'maxDate max',
    );
    await page.locator('input[name="maxDate"]').fill('2019-08-01');

    await expect(page.locator('input[name="minLength"] + p')).toHaveText(
      'minLength required',
    );
    await page.locator('input[name="minLength"]').fill('1');
    await expect(page.locator('input[name="minLength"] + p')).toHaveText(
      'minLength minLength',
    );
    await page.locator('input[name="minLength"]').fill('12');

    await expect(page.locator('select[name="selectNumber"] + p')).toHaveText(
      'selectNumber required',
    );
    await page.locator('select[name="selectNumber"]').selectOption('12');

    await expect(page.locator('input[name="pattern"] + p')).toHaveText(
      'pattern required',
    );
    await page.locator('input[name="pattern"]').fill('t');
    await expect(page.locator('input[name="pattern"] + p')).toHaveText(
      'pattern pattern',
    );
    await expect(page.locator('input[name="pattern"] + p + p')).toHaveText(
      'pattern minLength',
    );
    await page.locator('input[name="pattern"]').fill('');
    await page.locator('input[name="pattern"]').fill('12345');

    await expect(page.locator('select[name="multiple"] + p')).toHaveText(
      'multiple required',
    );
    await expect(page.locator('select[name="multiple"] + p + p')).toHaveText(
      'multiple validate',
    );
    await page
      .locator('select[name="multiple"]')
      .selectOption(['optionA', 'optionB']);

    await expect(page.locator('input[name="validate"] + p')).toHaveText(
      'validate test',
    );
    await expect(page.locator('input[name="validate"] + p + p')).toHaveText(
      'validate test1',
    );
    await expect(page.locator('input[name="validate"] + p + p + p')).toHaveText(
      'validate test2',
    );
    await page.locator('input[name="validate"]').fill('test');

    await expect(page.locator('p')).toHaveCount(0);

    await page.locator('#trigger').click();
    await expect(page.locator('p')).toHaveCount(2);
    await expect(page.locator('b')).toHaveCount(2);

    await page.locator('#clear').click();
    await expect(page.locator('p')).toHaveCount(0);
    await expect(page.locator('b')).toHaveCount(0);

    await expect(page.locator('#renderCount')).toHaveText('27');
  });
});
