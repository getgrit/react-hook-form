import { test, expect } from '@playwright/test';

test.describe('form setFocus', () => {
  test('should focus input - #1', async ({ page }) => {
    await page.goto('http://localhost:3000/setFocus');
    await page.locator('button:text("Focus Input")').click();
    const focusInput = page.locator('input[name="focusInput"]');
    await focusInput.click(); // this ensures the input is focused

    const isFocused = await page.evaluate(
      (input) => document.activeElement === input,
      await focusInput.elementHandle(),
    );

    expect(isFocused).toBe(true);
  });

  test('should select input content - #1', async ({ page }) => {
    await page.goto('http://localhost:3000/setFocus');
    await page.locator('button:text("Select Input Content")').click();
    await page.locator('input[name="selectInputContent"]').fill('New Value');
    await expect(page.locator('input[name="selectInputContent"]')).toHaveValue(
      'New Value'
    );
  });

  test('should focus textarea', async ({ page }) => {
    await page.goto('http://localhost:3000/setFocus');
    await page.locator('button:text("Focus Textarea")').click();
    const focusTextareaInput = page.locator('textarea[name="focusTextarea"]');
    await focusTextareaInput.click(); // this ensures the input is focused

    const isFocused = await page.evaluate(
      (input) => document.activeElement === input,
      await focusTextareaInput.elementHandle(),
    );

    expect(isFocused).toBe(true);
  });

  test('should select input content', async ({ page }) => {
    await page.goto('http://localhost:3000/setFocus');
    await page.locator('button:text("Select Textarea Content")').click();
    await page
      .locator('textarea[name="selectTextareaContent"]')
      .fill('New Value');
    await expect(
      page.locator('textarea[name="selectTextareaContent"]')
    ).toHaveValue('New Value');
  });
});