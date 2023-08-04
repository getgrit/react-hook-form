import { expect, test } from '@playwright/test';

test.describe('form state with nested fields', () => {
  async function checkState(page, expected) {
    const stateContent = await page.locator('#state').textContent();
    const state = JSON.parse(stateContent);
    expect(state).toEqual(expected);
  }

  test('should return correct form state with onSubmit mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formStateWithNestedFields/onSubmit');

    await checkState(page, {
      isDirty: false,
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: [],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="left.test1"]').fill('test');
    await page.locator('input[name="left.test1"]').blur();

    await checkState(page, {
      isDirty: true,
      dirty: ['left.test1'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['left.test1'],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="left.test1"]').fill('');
    await checkState(page, {
      isDirty: false,
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['left.test1'],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="left.test1"]').fill('test');
    await page.locator('input[name="left.test2"]').fill('test');
    await page.locator('input[name="left.test2"]').blur();
    await checkState(page, {
      isDirty: true,
      dirty: ['left.test1', 'left.test2'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['left.test1', 'left.test2'],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="left.test2"]').fill('');

    await page.locator('#submit').click();
    await checkState(page, {
      isDirty: true,
      dirty: ['left.test1'],
      isSubmitted: true,
      submitCount: 1,
      touched: ['left.test1', 'left.test2'],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="left.test2"]').fill('test');
    await page.locator('#submit').click();
    await checkState(page, {
      isDirty: true,
      dirty: ['left.test1', 'left.test2'],
      isSubmitted: true,
      submitCount: 2,
      touched: ['left.test1', 'left.test2'],
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });
    await expect(page.locator('#renderCount')).toHaveText('14');
  });

  test('should return correct form state with onChange mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formStateWithNestedFields/onChange');

    await checkState(page, {
      isDirty: false,
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: [],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="left.test1"]').fill('test');
    await page.locator('input[name="left.test1"]').blur();
    await checkState(page, {
      isDirty: true,
      dirty: ['left.test1'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['left.test1'],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="left.test1"]').fill('');
    await checkState(page, {
      isDirty: false,
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['left.test1'],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="left.test1"]').fill('test');
    await page.locator('input[name="left.test2"]').fill('test');
    await page.locator('input[name="left.test2"]').blur();
    await checkState(page, {
      isDirty: true,
      dirty: ['left.test1', 'left.test2'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['left.test1', 'left.test2'],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: true,
    });

    await page.locator('input[name="left.test2"]').fill('');

    await page.locator('#submit').click();
    await checkState(page, {
      isDirty: true,
      dirty: ['left.test1'],
      isSubmitted: true,
      submitCount: 1,
      touched: ['left.test1', 'left.test2'],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="left.test2"]').fill('test');
    await page.locator('#submit').click();
    await checkState(page, {
      isDirty: true,
      dirty: ['left.test1', 'left.test2'],
      isSubmitted: true,
      submitCount: 2,
      touched: ['left.test1', 'left.test2'],
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });
    await expect(page.locator('#renderCount')).toHaveText('14');
  });

  test('should return correct form state with onBlur mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formStateWithNestedFields/onBlur');

    await checkState(page, {
      isDirty: false,
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: [],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="left.test1"]').fill('test');
    await page.locator('input[name="left.test1"]').blur();
    await checkState(page, {
      isDirty: true,
      dirty: ['left.test1'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['left.test1'],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="left.test1"]').fill('');
    await checkState(page, {
      isDirty: false,
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['left.test1'],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="left.test1"]').fill('test');
    await page.locator('input[name="left.test2"]').fill('test');
    await page.locator('input[name="left.test2"]').blur();
    await checkState(page, {
      isDirty: true,
      dirty: ['left.test1', 'left.test2'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['left.test1', 'left.test2'],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: true,
    });

    await page.locator('input[name="left.test2"]').fill('');

    await page.locator('#submit').click();
    await checkState(page, {
      isDirty: true,
      dirty: ['left.test1'],
      isSubmitted: true,
      submitCount: 1,
      touched: ['left.test1', 'left.test2'],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="left.test2"]').fill('test');
    await page.locator('#submit').click();
    await checkState(page, {
      isDirty: true,
      dirty: ['left.test1', 'left.test2'],
      isSubmitted: true,
      submitCount: 2,
      touched: ['left.test1', 'left.test2'],
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });
    await expect(page.locator('#renderCount')).toHaveText('15');
  });

  test('should reset dirty value when inputs reset back to default with onSubmit mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formStateWithNestedFields/onSubmit');
    await page.locator('input[name="left.test1"]').fill('test');
    await page.locator('input[name="left.test1"]').blur();
    await page.locator('input[name="left.test2"]').fill('test');
    await page.locator('input[name="left.test2"]').blur();

    await checkState(page, {
      isDirty: true,
      dirty: ['left.test1', 'left.test2'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['left.test1', 'left.test2'],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="left.test1"]').fill('');
    await page.locator('input[name="left.test2"]').fill('');

    await checkState(page, {
      isDirty: false,
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['left.test1', 'left.test2'],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await expect(page.locator('#renderCount')).toHaveText('7');
  });

  test('should reset dirty value when inputs reset back to default with onBlur mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formStateWithNestedFields/onBlur');
    await page.locator('input[name="left.test1"]').fill('test');
    await page.locator('input[name="left.test1"]').blur();
    await page.locator('input[name="left.test2"]').fill('test');
    await page.locator('input[name="left.test2"]').blur();

    await checkState(page, {
      isDirty: true,
      dirty: ['left.test1', 'left.test2'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['left.test1', 'left.test2'],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: true,
    });

    await page.locator('input[name="left.test1"]').fill('');
    await page.locator('input[name="left.test2"]').fill('');
    await page.locator('input[name="left.test2"]').blur();

    await checkState(page, {
      isDirty: false,
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['left.test1', 'left.test2'],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });
    await expect(page.locator('#renderCount')).toHaveText('8');
  });

  test('should reset dirty value when inputs reset back to default with onChange mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formStateWithNestedFields/onChange');
    await page.locator('input[name="left.test1"]').fill('test');
    await page.locator('input[name="left.test1"]').blur();
    await page.locator('input[name="left.test2"]').fill('test');
    await page.locator('input[name="left.test2"]').blur();

    await checkState(page, {
      isDirty: true,
      dirty: ['left.test1', 'left.test2'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['left.test1', 'left.test2'],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: true,
    });

    await page.locator('#resetForm').click();

    await checkState(page, {
      isDirty: false,
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: [],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="left.test1"]').fill('test');
    await page.locator('input[name="left.test1"]').blur();
    await page.locator('input[name="left.test2"]').fill('test');
    await page.locator('input[name="left.test2"]').blur();

    await page.locator('input[name="left.test1"]').fill('');
    await page.locator('input[name="left.test2"]').fill('');

    await checkState(page, {
      isDirty: false,
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['left.test1', 'left.test2'],
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await expect(page.locator('#renderCount')).toHaveText('13');
  });
});
