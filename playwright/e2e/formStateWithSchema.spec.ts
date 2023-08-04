import { expect, test } from '@playwright/test';

test.describe('form state with schema validation', () => {
  async function getState(page) {
    const stateContent = await page.locator('#state').textContent();
    return JSON.parse(stateContent);
  }

  test('should return correct form state with onSubmit mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formStateWithSchema/onSubmit');

    let state = await getState(page);
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

    await page.locator('input[name="firstName"]').fill('test');
    await page.locator('input[name="firstName"]').blur();
    state = await getState(page);
    expect(state).toEqual({
      dirty: ['firstName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="firstName"]').fill('');
    state = await getState(page);
    expect(state).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName'],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="firstName"]').fill('test');
    await page.locator('input[name="lastName"]').fill('test');
    await page.locator('input[name="lastName"]').blur();
    state = await getState(page);
    expect(state).toEqual({
      dirty: ['firstName', 'lastName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="lastName"]').fill('');

    await page.locator('#submit').click();
    state = await getState(page);
    expect(state).toEqual({
      dirty: ['firstName'],
      isSubmitted: true,
      submitCount: 1,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="lastName"]').fill('test');
    await page.locator('#submit').click();
    state = await getState(page);
    expect(state).toEqual({
      dirty: ['firstName', 'lastName'],
      isSubmitted: true,
      submitCount: 2,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });
    await page.locator('select[name="select"]').selectOption('1');
    await expect(page.locator('#renderCount')).toHaveText('14');
  });

  // Add more tests for onChange and onBlur modes, following the same pattern as the onSubmit mode test.
});
