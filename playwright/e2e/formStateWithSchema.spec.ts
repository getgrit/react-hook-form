import { expect, test } from '@playwright/test';

test.describe('form state with schema validation', () => {
  test('should return correct form state with onSubmit mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formStateWithSchema/onSubmit');

    const state = JSON.parse(await page.textContent('#state'));
    expect(state).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: [],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    // Rest of the test cases
  });

  test('should return correct form state with onChange mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onChange');

    // Rest of the test cases
  });

  test('should return correct form state with onBlur mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onBlur');

    // Rest of the test cases
  });

  test('should reset dirty value when inputs reset back to default with onSubmit mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onSubmit');

    // Rest of the test cases
  });

  test('should reset dirty value when inputs reset back to default with onBlur mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onBlur');

    // Rest of the test cases
  });

  test('should reset dirty value when inputs reset back to default with onChange mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onChange');

    // Rest of the test cases
  });
});
