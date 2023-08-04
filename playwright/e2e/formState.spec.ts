import { expect, test } from '@playwright/test';

test.describe('form state', () => {
  async function getState(page) {
    const stateContent = await page.locator('#state').textContent();
    return JSON.parse(stateContent);
  }

  test('should return correct form state with onSubmit mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onSubmit');

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
      isSubmitSuccessful: true,
      isValid: true,
    });
    await expect(page.locator('#renderCount')).toHaveText('14');
  });

  test('should return correct form state with onChange mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onChange');

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
      isValid: true,
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
      isSubmitSuccessful: true,
      isValid: true,
    });
    await expect(page.locator('#renderCount')).toHaveText('14');
  });

  test('should return correct form state with onBlur mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onBlur');

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
      isValid: true,
    });

    await page.locator('input[name="lastName"]').fill('');
    await page.locator('input[name="lastName"]').blur();

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
      isSubmitSuccessful: true,
      isValid: true,
    });
    await expect(page.locator('#renderCount')).toHaveText('15');
  });

  test('should reset dirty value when inputs reset back to default with onSubmit mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onSubmit');
    await page.locator('input[name="firstName"]').fill('test');
    await page.locator('input[name="firstName"]').blur();
    await page.locator('input[name="lastName"]').fill('test');
    await page.locator('input[name="lastName"]').blur();

    let state = await getState(page);
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

    await page.locator('input[name="firstName"]').fill('');
    await page.locator('input[name="lastName"]').fill('');
    await page.locator('input[name="lastName"]').blur();

    state = await getState(page);
    expect(state).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('select[name="select"]').selectOption('test1');
    await page.locator('select[name="select"]').blur();
    state = await getState(page);
    expect(state).toEqual({
      dirty: ['select'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName', 'select'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });
    await page.locator('select[name="select"]').selectOption('');

    state = await getState(page);
    expect(state).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName', 'select'],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="checkbox"]').check();
    await page.locator('input[name="checkbox"]').blur();
    state = await getState(page);
    expect(state).toEqual({
      dirty: ['checkbox'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName', 'select', 'checkbox'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="checkbox"]').uncheck();
    state = await getState(page);
    expect(state).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName', 'select', 'checkbox'],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="checkbox-checked"]').uncheck();
    await page.locator('input[name="checkbox-checked"]').blur();
    state = await getState(page);
    expect(state).toEqual({
      dirty: ['checkbox-checked'],
      isSubmitted: false,
      submitCount: 0,
      touched: [
        'firstName',
        'lastName',
        'select',
        'checkbox',
        'checkbox-checked',
      ],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });
    await page.locator('input[name="checkbox-checked"]').check();
    state = await getState(page);
    expect(state).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: [
        'firstName',
        'lastName',
        'select',
        'checkbox',
        'checkbox-checked',
      ],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="radio"]').check();
    await page.locator('input[name="radio"]').blur();
    state = await getState(page);
    expect(state).toEqual({
      dirty: ['radio'],
      isSubmitted: false,
      submitCount: 0,
      touched: [
        'firstName',
        'lastName',
        'select',
        'checkbox',
        'checkbox-checked',
        'radio',
      ],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('select[name="select"]').selectOption('');
    state = await getState(page);
    expect(state).toEqual({
      dirty: ['radio'],
      isSubmitted: false,
      submitCount: 0,
      touched: [
        'firstName',
        'lastName',
        'select',
        'checkbox',
        'checkbox-checked',
        'radio',
      ],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });
    await expect(page.locator('#renderCount')).toHaveText('18');
  });

  test('should reset dirty value when inputs reset back to default with onBlur mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onBlur');
    await page.locator('input[name="firstName"]').fill('test');
    await page.locator('input[name="firstName"]').blur();
    await page.locator('input[name="lastName"]').fill('test');
    await page.locator('input[name="lastName"]').blur();

    let state = await getState(page);
    expect(state).toEqual({
      dirty: ['firstName', 'lastName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: true,
    });

    await page.locator('input[name="firstName"]').fill('');
    await page.locator('input[name="lastName"]').fill('');
    await page.locator('input[name="lastName"]').blur();

    state = await getState(page);
    expect(state).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });
    await expect(page.locator('#renderCount')).toHaveText('8');
  });

  test('should reset dirty value when inputs reset back to default with onChange mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onChange');
    await page.locator('input[name="firstName"]').fill('test');
    await page.locator('input[name="firstName"]').blur();
    await page.locator('input[name="lastName"]').fill('test');
    await page.locator('input[name="lastName"]').blur();

    let state = await getState(page);
    expect(state).toEqual({
      dirty: ['firstName', 'lastName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: true,
    });

    await page.locator('#resetForm').click();

    state = await getState(page);
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
    await page.locator('input[name="lastName"]').fill('test');
    await page.locator('input[name="lastName"]').blur();

    await page.locator('input[name="firstName"]').fill('');
    await page.locator('input[name="lastName"]').fill('');

    state = await getState(page);
    expect(state).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await expect(page.locator('#renderCount')).toHaveText('13');
  });
});
