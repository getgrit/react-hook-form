import { expect, test } from '@playwright/test';

test.describe('ConditionalField', () => {
  test('should reflect correct form state and data collection', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/conditionalField');

    const getState = async () =>
      JSON.parse(await page.locator('#state').textContent());

    expect(await getState()).toEqual({
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
    await page.locator('input[name="lastName"]').blur();

    expect(await getState()).toEqual({
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
    await expect(page.locator('#result')).toHaveText(
      '{"selectNumber":"1","firstName":"bill","lastName":"luo"}',
    );

    expect(await getState()).toEqual({
      dirty: ['selectNumber', 'firstName', 'lastName'],
      isSubmitted: true,
      submitCount: 1,
      touched: ['selectNumber', 'firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });

    await page.locator('select[name="selectNumber"]').selectOption('2');

    expect(await getState()).toEqual({
      dirty: ['selectNumber', 'firstName', 'lastName'],
      isSubmitted: true,
      submitCount: 1,
      touched: ['selectNumber', 'firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: false,
    });

    await page.locator('input[name="min"]').fill('10');
    await page.locator('input[name="max"]').fill('2');
    await page.locator('input[name="max"]').blur();

    expect(await getState()).toEqual({
      dirty: ['selectNumber', 'firstName', 'lastName', 'min', 'max'],
      isSubmitted: true,
      submitCount: 1,
      touched: ['selectNumber', 'firstName', 'lastName', 'min', 'max'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });

    await page.locator('button#submit').click();

    expect(await getState()).toEqual({
      dirty: ['selectNumber', 'firstName', 'lastName', 'min', 'max'],
      isSubmitted: true,
      submitCount: 2,
      touched: ['selectNumber', 'firstName', 'lastName', 'min', 'max'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });

    await page.locator('select[name="selectNumber"]').selectOption('3');

    expect(await getState()).toEqual({
      dirty: ['selectNumber', 'firstName', 'lastName', 'min', 'max'],
      isSubmitted: true,
      submitCount: 2,
      touched: ['selectNumber', 'firstName', 'lastName', 'min', 'max'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });

    await page.locator('input[name="notRequired"]').fill('test');
    await page.locator('input[name="notRequired"]').blur();

    expect(await getState()).toEqual({
      dirty: [
        'selectNumber',
        'firstName',
        'lastName',
        'min',
        'max',
        'notRequired',
      ],
      isSubmitted: true,
      submitCount: 2,
      touched: [
        'selectNumber',
        'firstName',
        'lastName',
        'min',
        'max',
        'notRequired',
      ],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });

    await page.locator('button#submit').click();

    expect(await getState()).toEqual({
      dirty: [
        'selectNumber',
        'firstName',
        'lastName',
        'min',
        'max',
        'notRequired',
      ],
      isSubmitted: true,
      submitCount: 3,
      touched: [
        'selectNumber',
        'firstName',
        'lastName',
        'min',
        'max',
        'notRequired',
      ],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });

    await expect(page.locator('#renderCount')).toHaveText('30');
  });
});
