import { test, expect } from '@playwright/test';

test.describe('form state with schema validation', () => {
  test.skip('should return correct form state with onSubmit mode', async ({
    page
  }) => {
    await page.goto('http://localhost:3000/formStateWithSchema/onSubmit');

    let state = await page.$eval('#state', (el) =>
      JSON.parse(el.textContent ?? ''),
    );
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

    await page.fill('input[name="firstName"]', 'test');
    await page.locator('input[name="firstName"]', 'Tab');
    state = await page.$eval('#state', (el) => JSON.parse(el.textContent));
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

    await page.fill('input[name="firstName"]', '');
    state = await page.$eval('#state', (el) => JSON.parse(el.textContent));
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

    await page.fill('input[name="firstName"]', 'test');
    await page.fill('input[name="lastName"]', 'test');
    await page.press('input[name="lastName"]', 'Tab');
    state = await page.$eval('#state', (el) => JSON.parse(el.textContent));
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

    await page.fill('input[name="lastName"]', '');

    await page.click('#submit');
    state = await page.$eval('#state', (el) => JSON.parse(el.textContent));
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

    await page.fill('input[name="lastName"]', 'test');
    await page.click('#submit');
    state = await page.$eval('#state', (el) => JSON.parse(el.textContent));
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

    await page.selectOption('select[name="select"]', '1');
    expect(await page.innerText('#renderCount')).toBe('14');
  });

  test.skip('should return correct form state with onChange mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onChange');

    let state = await page.$eval('#state', (el) => JSON.parse(el.textContent));
    expect(state).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: [],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false
    });

    await page.fill('input[name="firstName"]', 'test');
    await page.locator('input[name="firstName"]').blur();
    state = await page.$eval('#state', (el) => JSON.parse(el.textContent!));
    expect(state).toEqual({
      dirty: ['firstName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false
    });

    await page.fill('input[name="firstName"]', '');
    await page.locator('input[name="firstName"]').blur();
    state = await page.$eval('#state', (el) => JSON.parse(el.textContent!));
    expect(state).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName'],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false
    });

    await page.fill('input[name="firstName"]', 'test');
    await page.fill('input[name="lastName"]', 'test');
    await page.press('input[name="lastName"]', 'Tab');
    state = await page.$eval('#state', (el) => JSON.parse(el.textContent));
    expect(state).toEqual({
      dirty: ['firstName', 'lastName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: true
    });

    await page.fill('input[name="lastName"]', '');

    await page.click('#submit');
    state = await page.$eval('#state', (el) => JSON.parse(el.textContent));
    expect(state).toEqual({
      dirty: ['firstName'],
      isSubmitted: true,
      submitCount: 1,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false
    });

    await page.fill('input[name="lastName"]', 'test');
    await page.click('#submit');
    state = await page.$eval('#state', (el) => JSON.parse(el.textContent));
    expect(state).toEqual({
      dirty: ['firstName', 'lastName'],
      isSubmitted: true,
      submitCount: 2,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true
    });

    expect(await page.innerText('#renderCount')).toBe('14');
  });

  test.skip('should return correct form state with onBlur mode', async ({
    page
  }) => {
    await page.goto('http://localhost:3000/formState/onBlur');

    let state = await page.$eval('#state', (el) =>
      JSON.parse(el.textContent ?? ''),
    );
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

    await page.fill('input[name="firstName"]', 'test');
    await page.press('input[name="firstName"]', 'Tab');
    state = await page.$eval('#state', (el) => JSON.parse(el.textContent));
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

    await page.fill('input[name="firstName"]', '');
    state = await page.$eval('#state', (el) => JSON.parse(el.textContent));
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

    await page.fill('input[name="firstName"]', 'test');
    await page.fill('input[name="lastName"]', 'test');
    await page.press('input[name="lastName"]', 'Tab');
    state = await page.$eval('#state', (el) => JSON.parse(el.textContent));
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

    await page.fill('input[name="lastName"]', '');
    await page.click('#submit');
    state = await page.$eval('#state', (el) => JSON.parse(el.textContent));
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

    await page.fill('input[name="lastName"]', 'test');
    await page.click('#submit');
    state = await page.$eval('#state', (el) => JSON.parse(el.textContent));
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

    const renderCount = await page.$eval('#renderCount', (el) =>
      Number(el.textContent),
    );
    expect(renderCount).toBe(15);
  });

  test.skip('should reset dirty value when inputs reset back to default with onSubmit mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onSubmit');

    await page.fill('input[name="firstName"]', 'test');
    await page.keyboard.blur();
    await page.fill('input[name="lastName"]', 'test');
    await page.keyboard.blur();

    const stateAfterNameFill = await page.$eval('#state', (el) =>
      JSON.parse(el.textContent)
    );
    expect(stateAfterNameFill).toEqual({
      dirty: ['firstName', 'lastName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false
    });

    await page.locator('input[name="firstName"]').clear();
    await page.locator('input[name="lastName"]').clear();

    const stateAfterNameClear = await page.$eval('#state', (el) =>
      JSON.parse(el.textContent)
    );
    expect(stateAfterNameClear).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false
    });

    await page.selectOption('select[name="select"]', 'test1');
    await page.keyboard.blur();
    await page.selectOption('select[name="select"]', '');
    await page.check('input[name="checkbox"]');
    await page.keyboard.blur();
    await page.uncheck('input[name="checkbox"]');
    await page.check('input[name="checkbox-checked"]');
    await page.keyboard.blur();
    await page.uncheck('input[name="checkbox-checked"]');
    await page.check('input[name="radio"]');
    await page.keyboard.blur();
    await page.selectOption('select[name="select"]', '');

    const finalState = await page.$eval('#state', (el) =>
      JSON.parse(el.textContent)
    );
    expect(finalState).toEqual({
      dirty: ['radio'],
      isSubmitted: false,
      submitCount: 0,
      touched: [
        'firstName',
        'lastName',
        'select',
        'checkbox',
        'checkbox-checked',
        'radio'
      ],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false
    });

    // @grit suppress
   // const renderCount = await page.locator('#renderCount').textContent();
    expect(renderCount).toBe('18');
  });

  test.skip('should reset dirty value when inputs reset back to default with onBlur mode', async ({
    page
  }) => {
    await page.goto('http://localhost:3000/formState/onBlur');

    await page.fill('input[name="firstName"]', 'test');
    await page.locator('input[name="firstName"]').blur();

    await page.fill('input[name="lastName"]', 'test');
    await page.locator('input[name="lastName"]').blur();

    let state = await page.$eval('#state', (el) =>
      JSON.parse(el.textContent ?? ''),
    );
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

    await page.fill('input[name="firstName"]', '');
    await page.fill('input[name="lastName"]', '');
    await page.locator('input[name="lastName"]').blur();

    state = await page.$eval('#state', (el) => JSON.parse(el.textContent));
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

    // @grit suppress
   // const renderCount = await page.locator('#renderCount').textContent();
    expect(renderCount).toBe('8');
  });

  test.skip('should reset dirty value when inputs reset back to default with onChange mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onChange');

    await page.fill('input[name="firstName"]', 'test');
    await page.press('input[name="firstName"]', 'Tab');
    await page.fill('input[name="lastName"]', 'test');
    await page.press('input[name="lastName"]', 'Tab');

    let state = await page.$eval('#state', (el) =>
      JSON.parse(el.textContent ?? '')
    );
    expect(state).toEqual({
      dirty: ['firstName', 'lastName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: true
    });

    await page.click('#resetForm');

    state = await page.$eval('#state', (el) =>
      JSON.parse(el.textContent ?? '')
    );
    expect(state).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: [],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false
    });

    await page.fill('input[name="firstName"]', 'test');
    await page.press('input[name="firstName"]', 'Tab');
    await page.fill('input[name="lastName"]', 'test');
    await page.press('input[name="lastName"]', 'Tab');

    await page.fill('input[name="firstName"]', '');
    await page.fill('input[name="lastName"]', '');

    state = await page.$eval('#state', (el) =>
      JSON.parse(el.textContent ?? '')
    );
    expect(state).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false
    });

    const renderCount = await page.$eval(
      '#renderCount',
      (el) => el.textContent
    );
    expect(renderCount).toBe('13');
  });
});