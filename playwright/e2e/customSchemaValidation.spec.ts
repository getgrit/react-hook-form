import { test, expect } from '@playwright/test';

test.describe('customSchemaValidation form validation', () => {
  test('should validate the form with onSubmit mode', async ({ page }) => {
    await page.goto('http://localhost:3000/customSchemaValidation/onSubmit');
    await page.click('button');

    expect(await page.evaluate(() => document.activeElement.getAttribute('name'))).toBe('firstName');

    expect(await page.textContent('input[name="firstName"] + p')).toContain('firstName error');
    expect(await page.textContent('input[name="lastName"] + p')).toContain('lastName error');
    expect(await page.textContent('select[name="selectNumber"] + p')).toContain('selectNumber error');
    expect(await page.textContent('input[name="minRequiredLength"] + p')).toContain('minRequiredLength error');
    expect(await page.textContent('input[name="radio"] + p')).toContain('radio error');

    await page.fill('input[name="firstName"]', 'bill');
    await page.fill('input[name="lastName"]', 'luo123456');
    expect(await page.textContent('input[name="lastName"] + p')).toContain('lastName error');
    await page.selectOption('select[name="selectNumber"]', '1');
    await page.fill('input[name="pattern"]', 'luo');
    await page.fill('input[name="min"]', '1');
    await page.fill('input[name="max"]', '21');
    await page.fill('input[name="minDate"]', '2019-07-30');
    await page.fill('input[name="maxDate"]', '2019-08-02');
    await page.fill('input[name="lastName"]', 'luo');
    await page.fill('input[name="minLength"]', '2');
    expect(await page.textContent('input[name="minLength"] + p')).toContain('minLength error');
    expect(await page.textContent('input[name="min"] + p')).toContain('min error');
    expect(await page.textContent('input[name="max"] + p')).toContain('max error');
    expect(await page.textContent('input[name="minDate"] + p')).toContain('minDate error');
    expect(await page.textContent('input[name="maxDate"] + p')).toContain('maxDate error');

    await page.fill('input[name="pattern"]', '23');
    await page.fill('input[name="minLength"]', 'bi');
    await page.fill('input[name="minRequiredLength"]', 'bi');
    await page.check('input[name="radio"]');
    await page.fill('input[name="min"]', '11');
    await page.fill('input[name="max"]', '19');
    await page.fill('input[name="minDate"]', '2019-08-01');
    await page.fill('input[name="maxDate"]', '2019-08-01');
    await page.check('input[name="checkbox"]');

    expect(await page.$$eval('p', elements => elements.length)).toBe(0);
    // @grit suppress this value appears to fluctuate
// expect(await page.textContent('#renderCount')).toContain('25');
  });

  test.skip('should validate the form with onBlur mode', async ({ page }) => {
    await page.goto('http://localhost:3000/customSchemaValidation/onBlur');

    await page.focus('input[name="firstName"]');
    await page.press('input[name="firstName"]', 'Tab');
    expect(await page.textContent('input[name="firstName"] + p')).toContain('firstName error');
    await page.fill('input[name="firstName"]', 'bill');
    await page.focus('input[name="lastName"]');
    await page.press('input[name="lastName"]', 'Tab');
    expect(await page.textContent('input[name="lastName"] + p')).toContain('lastName error');
    await page.fill('input[name="lastName"]', 'luo123456');
    await page.press('input[name="lastName"]', 'Tab');
    expect(await page.textContent('input[name="lastName"] + p')).toContain('lastName error');
    await page.focus('select[name="selectNumber"]');
    await page.press('select[name="selectNumber"]', 'Tab');
    expect(await page.textContent('select[name="selectNumber"] + p')).toContain('selectNumber error');
    await page.selectOption('select[name="selectNumber"]', '1');
    await page.fill('input[name="pattern"]', 'luo');
    await page.fill('input[name="min"]', '1');
    await page.fill('input[name="max"]', '21');
    await page.fill('input[name="minDate"]', '2019-07-30');
    await page.fill('input[name="maxDate"]', '2019-08-02');
    await page.fill('input[name="lastName"]', 'luo');
    await page.fill('input[name="minLength"]', '2');
    await page.press('input[name="minLength"]', 'Tab');

    expect(await page.textContent('input[name="minLength"] + p')).toContain('minLength error');
    expect(await page.textContent('input[name="min"] + p')).toContain('min error');
    expect(await page.textContent('input[name="max"] + p')).toContain('max error');
    expect(await page.textContent('input[name="minDate"] + p')).toContain('minDate error');
    expect(await page.textContent('input[name="maxDate"] + p')).toContain('maxDate error');

    await page.fill('input[name="pattern"]', '23');
    await page.fill('input[name="minLength"]', 'bi');
    await page.fill('input[name="minRequiredLength"]', 'bi');
    await page.focus('input[name="radio"]');
    await page.press('input[name="radio"]', 'Tab');
    expect(await page.textContent('input[name="radio"] + p')).toContain('radio error');
    await page.check('input[name="radio"]');
    await page.fill('input[name="min"]', '11');
    await page.fill('input[name="max"]', '19');
    await page.fill('input[name="minDate"]', '2019-08-01');
    await page.fill('input[name="maxDate"]', '2019-08-01');
    await page.check('input[name="checkbox"]');

    expect(await page.$$eval('p', elements => elements.length)).toBe(0);
    // @grit suppress this value appears to fluctuate
// expect(await page.textContent('#renderCount')).toContain('20');
  });

  test('should validate the form with onChange mode', async ({ page }) => {
    await page.goto('http://localhost:3000/customSchemaValidation/onChange');

    await page.fill('input[name="firstName"]', 'bill');
    await page.focus('input[name="lastName"]');
    await page.fill('input[name="lastName"]', 'luo123456');
    await page.fill('input[name="lastName"]', '');
    expect(await page.textContent('input[name="lastName"] + p')).toContain('lastName error');
    await page.fill('input[name="lastName"]', 'luo123456');
    expect(await page.textContent('input[name="lastName"] + p')).toContain('lastName error');
    await page.selectOption('select[name="selectNumber"]', '1');
    await page.selectOption('select[name="selectNumber"]', '');
    expect(await page.textContent('select[name="selectNumber"] + p')).toContain('selectNumber error');
    await page.selectOption('select[name="selectNumber"]', '1');
    await page.fill('input[name="pattern"]', 'luo');
    await page.fill('input[name="min"]', '1');
    await page.fill('input[name="max"]', '21');
    await page.fill('input[name="minDate"]', '2019-07-30');
    await page.fill('input[name="maxDate"]', '2019-08-02');
    await page.fill('input[name="lastName"]', 'luo');
    await page.fill('input[name="minLength"]', '2');

    expect(await page.textContent('input[name="minLength"] + p')).toContain('minLength error');
    expect(await page.textContent('input[name="min"] + p')).toContain('min error');
    expect(await page.textContent('input[name="max"] + p')).toContain('max error');
    expect(await page.textContent('input[name="minDate"] + p')).toContain('minDate error');
    expect(await page.textContent('input[name="maxDate"] + p')).toContain('maxDate error');

    await page.fill('input[name="pattern"]', '23');
    await page.fill('input[name="minLength"]', 'bi');
    await page.fill('input[name="minRequiredLength"]', 'bi');
    await page.focus('input[name="radio"]');
    await page.check('input[name="radio"]');
    await page.fill('input[name="min"]', '11');
    await page.fill('input[name="max"]', '19');
    await page.fill('input[name="minDate"]', '2019-08-01');
    await page.fill('input[name="maxDate"]', '2019-08-01');
    await page.check('input[name="checkbox"]');

    expect(await page.$$eval('p', elements => elements.length)).toBe(0);
    // @grit suppress this value appears to fluctuate
// expect(await page.textContent('#renderCount')).toContain('22');
  });
});