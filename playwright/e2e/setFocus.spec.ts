import { expect, test } from '@playwright/test';

test.describe('form setFocus', () => {
  test('should focus input', async ({ page }) => {
    await page.goto('http://localhost:3000/setFocus');
    await page.locator('button:text("Focus Input")').click();
    await expect(page.locator('input[name="focusInput"]')).toHaveFocus();
  });

  test('should select input content', async ({ page }) => {
    await page.goto('http://localhost:3000/setFocus');
    await page.locator('button:text("Select Input Content")').click();
    await page.locator('input[name="selectInputContent"]').fill('New Value');
    await expect(page.locator('input[name="selectInputContent"]')).toHaveValue(
      'New Value',
    );
  });

  test('should focus textarea', async ({ page }) => {
    await page.goto('http://localhost:3000/setFocus');
    await page.locator('button:text("Focus Textarea")').click();
    await expect(page.locator('textarea[name="focusTextarea"]')).toHaveFocus();
  });

  test('should select input content1', async ({ page }) => {
    await page.goto('http://localhost:3000/setFocus');
    await page.locator('button:text("Select Textarea Content")').click();
    await page
      .locator('textarea[name="selectTextareaContent"]')
      .fill('New Value');
    await expect(
      page.locator('textarea[name="selectTextareaContent"]'),
    ).toHaveValue('New Value');
  });
});
