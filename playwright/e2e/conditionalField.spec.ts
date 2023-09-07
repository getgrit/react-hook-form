
import { test, expect } from '@playwright/test';

test.describe('ConditionalField', () => {
  test.skip('should reflect correct form state and data collection', async ({ page }) => {
    await page.goto('http://localhost:3000/conditionalField');
    const expectedInitialState = {
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: [],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    };
    expect(JSON.parse(await page.locator('#state').textContent())).toEqual(expectedInitialState);

    await page.locator('select[name="selectNumber"]').selectOption('1');
    await page.locator('input[name="firstName"]').fill('bill');
    await page.locator('input[name="lastName"]').fill('luo');
    await page.locator('input[name="lastName"]').blur();
    const expectedState1 = {
      dirty: ['selectNumber', 'firstName', 'lastName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['selectNumber', 'firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: true,
    };
    // @grit suppress
/*
expect(JSON.parse(await page.locator('#state').textContent())).toEqual(expectedState1);
*/
    await page.locator('button#submit').click();
    expect(await page.locator('#result').textContent()).toContain('{"selectNumber":"1","firstName":"bill","lastName":"luo"}');
    const expectedState2 = {
      dirty: ['selectNumber', 'firstName', 'lastName'],
      isSubmitted: true,
      submitCount: 1,
      touched: ['selectNumber', 'firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    };
    // @grit suppress
/*
expect(JSON.parse(await page.locator('#state').textContent())).toEqual(expectedState2);
*/
    const expectedResult1 = {
      selectNumber: '1',
      firstName: 'bill',
      lastName: 'luo',
    };
    expect(JSON.parse(await page.locator('#result').textContent())).toEqual(expectedResult1);

    await page.locator('select[name="selectNumber"]').selectOption('2');
    const expectedState3 = {
      dirty: ['selectNumber', 'firstName', 'lastName'],
      isSubmitted: true,
      submitCount: 1,
      touched: ['selectNumber', 'firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: false,
    };
    // @grit suppress
/*
expect(JSON.parse(await page.locator('#state').textContent())).toEqual(expectedState3);
*/
    await page.locator('input[name="min"]').fill('10');
    await page.locator('input[name="max"]').fill('2');
    await page.locator('input[name="max"]').blur();
    const expectedState4 = {
      dirty: ['selectNumber', 'firstName', 'lastName', 'min', 'max'],
      isSubmitted: true,
      submitCount: 1,
      touched: ['selectNumber', 'firstName', 'lastName', 'min', 'max'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    };
    expect(JSON.parse(await page.locator('#state').textContent())).toEqual(expectedState4);
    await page.locator('button#submit').click();
    const expectedState5 = {
      dirty: ['selectNumber', 'firstName', 'lastName', 'min', 'max'],
      isSubmitted: true,
      submitCount: 2,
      touched: ['selectNumber', 'firstName', 'lastName', 'min', 'max'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    };
    expect(JSON.parse(await page.locator('#state').textContent())).toEqual(expectedState5);
    const expectedResult2 = {
      selectNumber: '2',
      firstName: 'bill',
      lastName: 'luo',
      min: '10',
      max: '2',
    };
    expect(JSON.parse(await page.locator('#result').textContent())).toEqual(expectedResult2);

    await page.locator('select[name="selectNumber"]').selectOption('3');
    const expectedState6 = {
      dirty: ['selectNumber', 'firstName', 'lastName', 'min', 'max'],
      isSubmitted: true,
      submitCount: 2,
      touched: ['selectNumber', 'firstName', 'lastName', 'min', 'max'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    };
    expect(JSON.parse(await page.locator('#state').textContent())).toEqual(expectedState6);

    await page.locator('input[name="notRequired"]').fill('test');
    await page.locator('input[name="notRequired"]').blur();
    const expectedState7 = {
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
    };
    expect(JSON.parse(await page.locator('#state').textContent())).toEqual(expectedState7);

    await page.locator('button#submit').click();
    const expectedResult3 = {
      selectNumber: '3',
      firstName: 'bill',
      lastName: 'luo',
      min: '10',
      max: '2',
      notRequired: 'test',
    };
    expect(JSON.parse(await page.locator('#result').textContent())).toEqual(expectedResult3);

    expect(await page.locator('#renderCount').textContent()).toContain('30');
  });
});
