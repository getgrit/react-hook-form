import { expect, test } from '@playwright/test';

test.describe('basic form validation', () => {
  test('should validate the form and reset the form', async ({ page }) => {
    // Replace all "cy.visit" with "await page.goto"
    await page.goto('http://localhost:3000/basic/onSubmit');
    // Replace all "cy.get" with "await page.locator"
    await page.locator('button#submit').click();

    // Replace all "cy.focused" with "await page.locator(':focus')"
    await expect(page.locator(':focus')).toHaveAttribute(
      'name',
      'nestItem.nest1',
    );

    // Replace all "cy.get" with "await page.locator"
    // Replace all "contains" with "toHaveText"
    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'firstName error',
    );
    await expect(page.locator('input[name="nestItem.nest1"] + p')).toHaveText(
      'nest 1 error',
    );
    await expect(
      page.locator('input[name="arrayItem.0.test1"] + p'),
    ).toHaveText('array item 1 error');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'lastName error',
    );
    await expect(page.locator('select[name="selectNumber"] + p')).toHaveText(
      'selectNumber error',
    );
    await expect(page.locator('select[name="multiple"] + p')).toHaveText(
      'multiple error',
    );
    await expect(
      page.locator('input[name="minRequiredLength"] + p'),
    ).toHaveText('minRequiredLength error');
    await expect(page.locator('input[name="radio"] + p')).toHaveText(
      'radio error',
    );
    await expect(page.locator('input[name="checkbox"] + p')).toHaveText(
      'checkbox error',
    );
    await expect(page.locator('input[name="checkboxArray"] + p')).toHaveText(
      'checkboxArray error',
    );
    await expect(page.locator('input[name="validate"] + p')).toHaveText(
      'validate error',
    );

    // Replace all "cy.get" with "await page.locator"
    // Replace all "type" with "fill"
    await page.locator('input[name="firstName"]').fill('bill');
    await page.locator('input[name="firstName"]').fill('a');
    await page.locator('input[name="arrayItem.0.test1"]').fill('ab');
    await page.locator('input[name="nestItem.nest1"]').fill('ab');
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
    await page.locator('input[name="lastName"]').fill('').fill('luo');
    await page.locator('input[name="minLength"]').fill('b');
    await page.locator('input[name="validate"]').fill('test');

    // Replace all "cy.get" with "await page.locator"
    // Replace all "contains" with "toHaveText"
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

    // Replace all "cy.get" with "await page.locator"
    // Replace all "type" with "fill"
    await page.locator('input[name="pattern"]').fill('23');
    await page.locator('input[name="minLength"]').fill('bi');
    await page.locator('input[name="minRequiredLength"]').fill('bi');
    await page.locator('select[name="multiple"]').selectOption(['optionA']);
    await page.locator('input[name="radio"]').check('1');
    await page.locator('input[name="min"]').fill('').fill('11');
    await page.locator('input[name="max"]').fill('').fill('19');
    await page.locator('input[name="minDate"]').fill('2019-08-01');
    await page.locator('input[name="maxDate"]').fill('2019-08-01');
    await page.locator('input[name="checkbox"]').check();
    await page.locator('input[name="checkboxArray"]').check('3');
    await page
      .locator('select[name="multiple"]')
      .selectOption(['optionA', 'optionB']);

    // Replace all "cy.get" with "await page.locator"
    // Replace all "should" with "await expect"
    await expect(page.locator('p')).toHaveCount(0);

    await page.locator('#submit').click();

    // Replace all "cy.get" with "await page.locator"
    // Replace all "should" with "await expect"
    const stateContent = await page.locator('pre').textContent();
    const received = JSON.parse(stateContent);
    const expected = {
      nestItem: { nest1: 'ab' },
      arrayItem: [{ test1: 'ab' }],
      firstName: 'billa',
      lastName: 'luo',
      min: '11',
      max: '19',
      minDate: '2019-08-01',
      maxDate: '2019-08-01',
      minLength: 'bbi',
      minRequiredLength: 'bi',
      selectNumber: '1',
      pattern: 'luo23',
      radio: '1',
      checkbox: true,
      checkboxArray: ['3'],
      multiple: ['optionA', 'optionB'],
      validate: 'test',
    };
    expect(received).toEqual(expected);

    await page.locator('#submit').click();

    await page.locator('#resetForm').click();
    await expect(page.locator('input[name="firstName"]')).toHaveValue('');
    await expect(page.locator('input[name="lastName"]')).toHaveValue('');
    await expect(page.locator('select[name="selectNumber"]')).toHaveValue('');
    await expect(page.locator('input[name="minRequiredLength"]')).toHaveValue(
      '',
    );
    await expect(page.locator('input[name="radio"]')).toHaveValue('');
    await expect(page.locator('input[name="max"]')).toHaveValue('');
    await expect(page.locator('input[name="min"]')).toHaveValue('');
    await expect(page.locator('input[name="minLength"]')).toHaveValue('');
    await expect(page.locator('input[name="checkbox"]')).toHaveValue('');
    await expect(page.locator('input[name="pattern"]')).toHaveValue('');
    await expect(page.locator('input[name="minDate"]')).toHaveValue('');
    await expect(page.locator('input[name="maxDate"]')).toHaveValue('');
    await expect(page.locator('#renderCount')).toHaveText('39');

    await expect(page.locator('#on-invalid-called-times')).toHaveText('1');
  });

  // Add more tests here following the same pattern
});
