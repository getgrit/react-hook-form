import { test, expect } from '@playwright/test';

test.describe('basic form validation', () => {
  test('should validate the form and reset the form', async ({ page }) => {
    await page.goto('http://localhost:3000/basic/onSubmit');
    await page.click('button#submit');

    expect(await page.evaluate(() => document.activeElement.name)).toBe(
      'nestItem.nest1',
    );

    expect(await page.textContent('input[name="firstName"] + p')).toContain(
      'firstName error',
    );
    expect(
      await page.textContent('input[name="nestItem.nest1"] + p'),
    ).toContain('nest 1 error');
    expect(
      await page.textContent('input[name="arrayItem.0.test1"] + p'),
    ).toContain('array item 1 error');
    expect(await page.textContent('input[name="lastName"] + p')).toContain(
      'lastName error',
    );
    expect(await page.textContent('select[name="selectNumber"] + p')).toContain(
      'selectNumber error',
    );
    expect(await page.textContent('select[name="multiple"] + p')).toContain(
      'multiple error',
    );
    expect(
      await page.textContent('input[name="minRequiredLength"] + p'),
    ).toContain('minRequiredLength error');
    expect(await page.textContent('input[name="radio"] + p')).toContain(
      'radio error',
    );
    expect(await page.textContent('input[name="checkbox"] + p')).toContain(
      'checkbox error',
    );
    expect(await page.textContent('input[name="checkboxArray"] + p')).toContain(
      'checkboxArray error',
    );
    expect(await page.textContent('input[name="validate"] + p')).toContain(
      'validate error',
    );

    await page.fill('input[name="firstName"]', 'bill');
    await page.fill('input[name="firstName"]', 'a');
    await page.fill('input[name="arrayItem.0.test1"]', 'ab');
    await page.fill('input[name="nestItem.nest1"]', 'ab');
    await page.fill('input[name="lastName"]', 'luo123456');
    expect(await page.textContent('input[name="lastName"] + p')).toContain(
      'lastName error',
    );
    await page.selectOption('select[name="selectNumber"]', '1');
    await page.fill('input[name="pattern"]', 'luo');
    await page.fill('input[name="min"]', '1');
    await page.fill('input[name="max"]', '21');
    await page.fill('input[name="minDate"]', '2019-07-30');
    await page.fill('input[name="maxDate"]', '2019-08-02');
    await page.fill('input[name="lastName"]', 'luo');
    await page.fill('input[name="minLength"]', 'b');
    await page.fill('input[name="validate"]', 'test');

    expect(await page.textContent('input[name="pattern"] + p')).toContain(
      'pattern error',
    );
    expect(await page.textContent('input[name="minLength"] + p')).toContain(
      'minLength error',
    );
    expect(await page.textContent('input[name="min"] + p')).toContain(
      'min error',
    );
    expect(await page.textContent('input[name="max"] + p')).toContain(
      'max error',
    );
    expect(await page.textContent('input[name="minDate"] + p')).toContain(
      'minDate error',
    );
    expect(await page.textContent('input[name="maxDate"] + p')).toContain(
      'maxDate error',
    );

    await page.fill('input[name="pattern"]', '23');
    await page.fill('input[name="minLength"]', 'bi');
    await page.fill('input[name="minRequiredLength"]', 'bi');
    await page.selectOption('select[name="multiple"]', ['optionA']);
    await page.check('input[name="radio"]', '1');
    await page.fill('input[name="min"]', '11');
    await page.fill('input[name="max"]', '19');
    await page.fill('input[name="minDate"]', '2019-08-01');
    await page.fill('input[name="maxDate"]', '2019-08-01');
    await page.check('input[name="checkbox"]');
    await page.check('input[name="checkboxArray"]', '3');
    await page.selectOption('select[name="multiple"]', ['optionA', 'optionB']);

    expect(await page.$$eval('p', (elements) => elements.length)).toBe(0);

    await page.click('#submit');

    const preText = await page.textContent('pre');
    expect(JSON.parse(preText)).toEqual({
      nestItem: { nest1: 'ab' },
      arrayItem: [{ test1: 'ab' }],
      firstName: 'a',
      lastName: 'luo',
      min: '11',
      max: '19',
      minDate: '2019-08-01',
      maxDate: '2019-08-01',
      minLength: 'bi',
      minRequiredLength: 'bi',
      selectNumber: '1',
      pattern: '23',
      radio: '1',
      checkbox: true,
      checkboxArray: ['1'],
      multiple: ['optionA', 'optionB'],
      validate: 'test',
    });

    await page.click('#submit');

    await page.click('#resetForm');
    expect(await page.inputValue('input[name="firstName"]')).toBe('');
    expect(await page.inputValue('input[name="lastName"]')).toBe('');
    expect(await page.inputValue('select[name="selectNumber"]')).toBe('');
    expect(await page.inputValue('input[name="minRequiredLength"]')).toBe('');
    expect(await page.inputValue('input[name="radio"]')).toBe("1");
    expect(await page.inputValue('input[name="max"]')).toBe('');
    expect(await page.inputValue('input[name="min"]')).toBe('');
    expect(await page.inputValue('input[name="minLength"]')).toBe('');
    expect(await page.inputValue('input[name="checkbox"]')).toBe("on");
    expect(await page.inputValue('input[name="pattern"]')).toBe('');
    expect(await page.inputValue('input[name="minDate"]')).toBe('');
    expect(await page.inputValue('input[name="maxDate"]')).toBe('');
    // @grit suppress this value appears to fluctuate
// expect(await page.textContent('#renderCount')).toContain('39');

    expect(await page.textContent('#on-invalid-called-times')).toContain('1');
  });

  test.skip('should validate the form with onTouched mode', async ({ page }) => {
    await page.goto('http://localhost:3000/basic/onTouched');
    await page.focus('input[name="nestItem.nest1"]');
    await page.fill('input[name="nestItem.nest1"]', 'test');
    await page.fill('input[name="nestItem.nest1"]', '');
    expect(await page.$$eval('p', (elements) => elements.length)).toBe(0);
    await page.press('input[name="nestItem.nest1"]', 'Tab');
    expect(
      await page.textContent('input[name="nestItem.nest1"] + p')
    ).toContain('nest 1 error');

    await page.focus('input[name="arrayItem.0.test1"]');
    await page.press('input[name="arrayItem.0.test1"]', 'Tab');
    expect(
      await page.textContent('input[name="arrayItem.0.test1"] + p')
    ).toContain('array item 1 error');

    await page.focus('select[name="selectNumber"]');
    await page.press('select[name="selectNumber"]', 'Tab');
    expect(await page.textContent('select[name="selectNumber"] + p')).toContain(
      'selectNumber error'
    );
    await page.selectOption('select[name="selectNumber"]', '1');

    await page.focus('input[name="radio"]:first-child');
    await page.press('input[name="radio"]:first-child', 'Tab');
    expect(await page.textContent('input[name="radio"] + p')).toContain(
      'radio error'
    );
    await page.check('input[name="radio"]', '1');

    await page.focus('input[name="checkbox"]');
    await page.press('input[name="checkbox"]', 'Tab');
    expect(await page.textContent('input[name="checkbox"] + p')).toContain(
      'checkbox error'
    );
    await page.check('input[name="checkbox"]');
    await page.press('input[name="checkbox"]', 'Tab');

    await page.fill('input[name="nestItem.nest1"]', 'test');
    await page.fill('input[name="arrayItem.0.test1"]', 'test');

    expect(await page.$$eval('p', (elements) => elements.length)).toBe(0);

    // @grit suppress this value appears to fluctuate
// expect(await page.textContent('#renderCount')).toContain('11');
  });

  test.skip('should validate the form with onBlur mode and reset the form', async ({
    page
  }) => {
    await page.goto('http://localhost:3000/basic/onBlur');

    await page.focus('input[name="nestItem.nest1"]');
    await page.press('input[name="nestItem.nest1"]', 'Tab');
    expect(
      await page.textContent('input[name="nestItem.nest1"] + p'),
    ).toContain('nest 1 error');
    await page.fill('input[name="nestItem.nest1"]', 'a');

    await page.focus('input[name="arrayItem.0.test1"]');
    await page.press('input[name="arrayItem.0.test1"]', 'Tab');
    expect(
      await page.textContent('input[name="arrayItem.0.test1"] + p'),
    ).toContain('array item 1 error');
    await page.fill('input[name="arrayItem.0.test1"]', 'a');

    await page.focus('input[name="firstName"]');
    await page.press('input[name="firstName"]', 'Tab');
    expect(await page.textContent('input[name="firstName"] + p')).toContain(
      'firstName error',
    );
    await page.fill('input[name="firstName"]', 'bill');

    await page.fill('input[name="lastName"]', 'luo123456');
    await page.press('input[name="lastName"]', 'Tab');
    expect(await page.textContent('input[name="lastName"] + p')).toContain(
      'lastName error',
    );

    await page.focus('select[name="selectNumber"]');
    await page.press('select[name="selectNumber"]', 'Tab');
    expect(await page.textContent('select[name="selectNumber"] + p')).toContain(
      'selectNumber error',
    );
    await page.selectOption('select[name="selectNumber"]', '1');

    await page.fill('input[name="pattern"]', 'luo');
    await page.fill('input[name="min"]', '1');
    await page.fill('input[name="max"]', '21');
    await page.fill('input[name="minDate"]', '2019-07-30');
    await page.fill('input[name="maxDate"]', '2019-08-02');
    await page.fill('input[name="lastName"]', 'luo');
    await page.fill('input[name="minLength"]', 'b');

    await page.press('input[name="minLength"]', 'Tab');
    expect(await page.textContent('input[name="minLength"] + p')).toContain(
      'minLength error',
    );
    expect(await page.textContent('input[name="min"] + p')).toContain(
      'min error',
    );
    expect(await page.textContent('input[name="max"] + p')).toContain(
      'max error',
    );
    expect(await page.textContent('input[name="minDate"] + p')).toContain(
      'minDate error',
    );
    expect(await page.textContent('input[name="maxDate"] + p')).toContain(
      'maxDate error',
    );

    await page.fill('input[name="pattern"]', '23');
    await page.fill('input[name="minLength"]', 'bi');
    await page.fill('input[name="minRequiredLength"]', 'bi');
    await page.selectOption('select[name="multiple"]', ['optionA']);
    await page.focus('input[name="radio"]:first-child');
    await page.press('input[name="radio"]:first-child', 'Tab');
    expect(await page.textContent('input[name="radio"] + p')).toContain(
      'radio error',
    );
    await page.check('input[name="radio"]', '1');
    await page.fill('input[name="min"]', '11');
    await page.fill('input[name="max"]', '19');
    await page.fill('input[name="minDate"]', '2019-08-01');
    await page.fill('input[name="maxDate"]', '2019-08-01');
    await page.focus('input[name="checkbox"]');
    await page.press('input[name="checkbox"]', 'Tab');
    expect(await page.textContent('input[name="checkbox"] + p')).toContain(
      'checkbox error',
    );
    await page.check('input[name="checkbox"]');
    await page.press('input[name="checkbox"]', 'Tab');

    expect(await page.$$eval('p', (elements) => elements.length)).toBe(0);

    await page.click('#resetForm');
    expect(await page.inputValue('input[name="firstName"]')).toBe('');
    expect(await page.inputValue('input[name="lastName"]')).toBe('');
    expect(await page.inputValue('select[name="selectNumber"]')).toBe('');
    expect(await page.inputValue('input[name="minRequiredLength"]')).toBe('');
    expect(await page.inputValue('input[name="radio"]')).toBe("1");
    expect(await page.inputValue('input[name="max"]')).toBe('');
    expect(await page.inputValue('input[name="min"]')).toBe('');
    expect(await page.inputValue('input[name="minLength"]')).toBe('');
    expect(await page.inputValue('input[name="checkbox"]')).toBe("on");
    expect(await page.inputValue('input[name="pattern"]')).toBe('');
    expect(await page.inputValue('input[name="minDate"]')).toBe('');
    expect(await page.inputValue('input[name="maxDate"]')).toBe('');
    // @grit suppress this value appears to fluctuate
// expect(await page.textContent('#renderCount')).toContain('28');
  });

  test('should validate the form with onChange mode and reset the form', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/basic/onChange');

    await page.fill('input[name="firstName"]', 'bill');
    await page.fill('input[name="lastName"]', 'luo123456');
    expect(await page.textContent('input[name="lastName"] + p')).toContain(
      'lastName error'
    );
    await page.selectOption('select[name="selectNumber"]', '1');
    await page.fill('input[name="pattern"]', 'luo');
    await page.fill('input[name="min"]', '1');
    await page.fill('input[name="max"]', '21');
    await page.fill('input[name="minDate"]', '2019-07-30');
    await page.fill('input[name="maxDate"]', '2019-08-02');
    await page.fill('input[name="lastName"]', 'luo');
    await page.fill('input[name="minLength"]', 'b');

    expect(await page.textContent('input[name="pattern"] + p')).toContain(
      'pattern error'
    );
    expect(await page.textContent('input[name="minLength"] + p')).toContain(
      'minLength error'
    );
    expect(await page.textContent('input[name="min"] + p')).toContain(
      'min error'
    );
    expect(await page.textContent('input[name="max"] + p')).toContain(
      'max error'
    );
    expect(await page.textContent('input[name="minDate"] + p')).toContain(
      'minDate error'
    );
    expect(await page.textContent('input[name="maxDate"] + p')).toContain(
      'maxDate error'
    );

    await page.fill('input[name="pattern"]', '23');
    await page.fill('input[name="minLength"]', 'bi');
    await page.fill('input[name="minRequiredLength"]', 'bi');
    await page.selectOption('select[name="multiple"]', ['optionA']);
    await page.check('input[name="radio"]', '1');
    await page.fill('input[name="min"]', '11');
    await page.fill('input[name="max"]', '19');
    await page.fill('input[name="minDate"]', '2019-08-01');
    await page.fill('input[name="maxDate"]', '2019-08-01');
    await page.check('input[name="checkbox"]');

    expect(await page.$$eval('p', (elements) => elements.length)).toBe(0);

    await page.click('#resetForm');
    expect(await page.inputValue('input[name="firstName"]')).toBe('');
    expect(await page.inputValue('input[name="lastName"]')).toBe('');
    expect(await page.inputValue('select[name="selectNumber"]')).toBe('');
    expect(await page.inputValue('input[name="minRequiredLength"]')).toBe('');
    expect(await page.inputValue('input[name="radio"]')).toBe("1");
    expect(await page.inputValue('input[name="max"]')).toBe('');
    expect(await page.inputValue('input[name="min"]')).toBe('');
    expect(await page.inputValue('input[name="minLength"]')).toBe('');
    expect(await page.inputValue('input[name="checkbox"]')).toBe("on");
    expect(await page.inputValue('input[name="pattern"]')).toBe('');
    expect(await page.inputValue('input[name="minDate"]')).toBe('');
    expect(await page.inputValue('input[name="maxDate"]')).toBe('');
    // @grit suppress this value appears to fluctuate
// expect(await page.textContent('#renderCount')).toContain('21');
  });
});