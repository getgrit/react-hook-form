import { expect, test } from '@playwright/test';

test.describe('form state', () => {
  test('should return correct form state with onSubmit mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onSubmit');

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

  // Other test cases
});
