import { expect, test } from '@playwright/test';

test.describe('ConditionalField', () => {
  test('should reflect correct form state and data collection', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/conditionalField');
    const state = await page.locator('#state').textContent();
    expect(JSON.parse(state)).toStrictEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: [],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('select[name="selectNumber"]').selectOption('1');
    await page.locator('input[name="firstName"]').fill('bill');
    await page.locator('input[name="lastName"]').fill('luo');
    await page.locator('input[name="lastName"]').press('Tab');
    const stateAfterBlur = await page.locator('#state').textContent();
    expect(JSON.parse(stateAfterBlur)).toStrictEqual({
      dirty: ['selectNumber', 'firstName', 'lastName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['selectNumber', 'firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: true,
    });
    await page.locator('button#submit').click();
    const result = await page.locator('#result').textContent();
    expect(JSON.parse(result)).toStrictEqual({
      selectNumber: '1',
      firstName: 'bill',
      lastName: 'luo',
    });
    const stateAfterSubmit = await page.locator('#state').textContent();
    expect(JSON.parse(stateAfterSubmit)).toStrictEqual({
      dirty: ['selectNumber', 'firstName', 'lastName'],
      isSubmitted: true,
      submitCount: 1,
      touched: ['selectNumber', 'firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });
    const resultAfterSubmit = await page.locator('#result').textContent();
    expect(JSON.parse(resultAfterSubmit)).toStrictEqual({
      selectNumber: '1',
      firstName: 'bill',
      lastName: 'luo',
    });

    await page.locator('select[name="selectNumber"]').selectOption('2');
    await page.locator('input[name="min"]').fill('10');
    await page.locator('input[name="max"]').fill('2');
    await page.locator('input[name="max"]').press('Tab');
    await page.locator('button#submit').click();
    const resultAfterSecondSubmit = await page.locator('#result').textContent();
    expect(JSON.parse(resultAfterSecondSubmit)).toStrictEqual({
      selectNumber: '2',
      firstName: 'bill',
      lastName: 'luo',
      min: '10',
      max: '2',
    });

    await page.locator('select[name="selectNumber"]').selectOption('3');
    await page.locator('input[name="notRequired"]').fill('test');
    await page.locator('input[name="notRequired"]').press('Tab');
    await page.locator('button#submit').click();
    const resultAfterThirdSubmit = await page.locator('#result').textContent();
    expect(JSON.parse(resultAfterThirdSubmit)).toStrictEqual({
      selectNumber: '3',
      firstName: 'bill',
      lastName: 'luo',
      min: '10',
      max: '2',
      notRequired: 'test',
    });

    const renderCount = await page.locator('#renderCount').textContent();
    expect(renderCount).toContain('30');
  });
});
