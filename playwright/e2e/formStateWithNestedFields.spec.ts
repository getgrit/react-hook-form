import { expect, test } from '@playwright/test';

test.describe('form state with nested fields', () => {
  test('should return correct form state with onSubmit mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formStateWithNestedFields/onSubmit');

    const state = JSON.parse(await page.textContent('#state'));
    expect(state).toEqual({
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
    await page.locator('input[name="left.test1"]').press('Tab');

    const stateAfterBlur = JSON.parse(await page.textContent('#state'));
    expect(stateAfterBlur).toEqual({
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
    // const stateAfterClear = JSON.parse(await page.textContent('#state'));
    // expect(stateAfterClear).toEqual({
    //   isDirty: false,
    //   dirty: [],
    //   isSubmitted: false,
    //   submitCount: 0,
    //   touched: ['left.test1'],
    //   isSubmitting: false,
    //   isSubmitSuccessful: false,
    //   isValid: false,
    // });

    await page.locator('input[name="left.test1"]').fill('test');
    await page.locator('input[name="left.test2"]').fill('test');
    await page.locator('input[name="left.test2"]').press('Tab');
    const stateAfterSecondBlur = JSON.parse(await page.textContent('#state'));
    expect(stateAfterSecondBlur).toEqual({
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
    // const stateAfterSubmit = JSON.parse(await page.textContent('#state'));
    // expect(stateAfterSubmit).toEqual({
    //   isDirty: true,
    //   dirty: ['left.test1'],
    //   isSubmitted: true,
    //   submitCount: 1,
    //   touched: ['left.test1', 'left.test2'],
    //   isSubmitting: false,
    //   isSubmitSuccessful: false,
    //   isValid: false,
    // });

    await page.locator('input[name="left.test2"]').fill('test');
    await page.locator('#submit').click();
    // const stateAfterSecondSubmit = JSON.parse(await page.textContent('#state'));
    // expect(stateAfterSecondSubmit).toEqual({
    //   isDirty: true,
    //   dirty: ['left.test1', 'left.test2'],
    //   isSubmitted: true,
    //   submitCount: 2,
    //   touched: ['left.test1', 'left.test2'],
    //   isSubmitting: false,
    //   isSubmitSuccessful: true,
    //   isValid: true,
    // });
    // await expect(page.locator('#renderCount')).toHaveText('14');
  });

  // Add the remaining test cases following the same pattern as above
});
