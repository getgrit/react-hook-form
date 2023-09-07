
import { test, expect } from '@playwright/test';

test.describe('form state', () => {
  async function getState(page) {
    return JSON.parse(await page.locator('#state').textContent());
  }

  test('should return correct form state with onSubmit mode', async ({ page }) => {
    await page.goto('http://localhost:3000/formState/onSubmit');

    expect(await getState(page)).toEqual({
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
    expect(await getState(page)).toEqual({
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
    expect(await getState(page)).toEqual({
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
    expect(await getState(page)).toEqual({
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
    expect(await getState(page)).toEqual({
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
    expect(await getState(page)).toEqual({
      dirty: ['firstName', 'lastName'],
      isSubmitted: true,
      submitCount: 2,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('14');
  });

  // Add the other test cases similarly, replacing Cypress commands with Playwright commands
});
