
import { test, expect } from '@playwright/test';

test.describe('form state with nested fields', () => {
  test('should return correct form state with onSubmit mode', async ({ page }) => {
    await page.goto('http://localhost:3000/formStateWithNestedFields/onSubmit');

    const expectedInitialState = {
      isDirty: false,
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: [],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    };

    expect(JSON.parse(await page.locator('#state').textContent())).toEqual(expectedInitialState);

    // Rest of the test cases
    // ...
  });

  // Other test cases
  // ...
});
