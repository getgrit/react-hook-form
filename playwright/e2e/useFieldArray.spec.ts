import { test } from '@playwright/test';

test.describe('useFieldArray', () => {
  test('should behaviour correctly without defaultValues', async ({ page }) => {
    await page.goto('http://localhost:3000/useFieldArray/normal');

    // ... rest of the test cases
  });

  test('should behaviour correctly with defaultValue', async ({ page }) => {
    await page.goto('http://localhost:3000/useFieldArray/default');

    // ... rest of the test cases
  });

  test('should behaviour correctly with defaultValue and without auto focus', async ({
    page,
  }) => {
    await page.goto(
      'http://localhost:3000/useFieldArray/defaultAndWithoutFocus',
    );

    // ... rest of the test cases
  });

  test('should replace fields with new values', async ({ page }) => {
    // ... rest of the test cases
  });

  test('should display the correct dirty value with default value', async ({
    page,
  }) => {
    // ... rest of the test cases
  });

  test('should display the correct dirty value with async default value', async ({
    page,
  }) => {
    // ... rest of the test cases
  });

  test('should display correct error with the inputs', async ({ page }) => {
    // ... rest of the test cases
  });

  test('should return correct touched values', async ({ page }) => {
    // ... rest of the test cases
  });

  test('should return correct touched values without autoFocus', async ({
    page,
  }) => {
    // ... rest of the test cases
  });

  test('should return correct isValid formState', async ({ page }) => {
    // ... rest of the test cases
  });
});
