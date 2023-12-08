import { expect, test } from '@playwright/test';

test.describe('controller basic form validation', () => {
  test('should validate the form and reset the form', async ({ page }) => {
    await page.goto('http://localhost:3000/controller/onSubmit');
    await page.locator('#submit').click();

    await expect(page.locator('#TextField')).toContainText('TextField Error');
    await expect(page.locator('#RadioGroup')).toContainText('RadioGroup Error');
    await expect(page.locator('#Checkbox')).toContainText('Checkbox Error');
    await expect(page.locator('#RadioGroup')).toContainText('RadioGroup Error');
    await expect(page.locator('#Select')).toContainText('Select Error');
    await expect(page.locator('#switch')).toContainText('switch Error');

    await page.locator('#input-checkbox input').click();
    await page.locator('input[name="gender1"]').first().click();
    await page.locator('#input-textField input').fill('test');
    await page.locator('#input-select > div > div').click();
    await page.locator('.MuiPopover-root ul > li:first-child').click();
    await page.locator('#input-switch input').click();
    await page.locator('#input-ReactSelect > div').click();
    await page.locator('#input-ReactSelect > div > div').nth(1).click();

    await expect(page.locator('.container > p')).toHaveCount(0);
    await expect(page.locator('#renderCount')).toContainText('8');
  });

  test('should validate the form with onBlur mode and reset the form', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/controller/onBlur');

    await expect(page.locator('p')).toHaveCount(0);
    await page.locator('#input-checkbox input').focus();
    await page.locator('#input-checkbox input').blur();
    await expect(page.locator('#Checkbox')).toContainText('Checkbox Error');

    await page.locator('#input-textField input').focus();
    await page.locator('#input-textField input').blur();
    await expect(page.locator('#TextField')).toContainText('TextField Error');

    await page.locator('#input-select > div > div').focus();
    await page.locator('#input-select > div > div').blur();
    await expect(page.locator('#Select')).toContainText('Select Error');

    await page.locator('#input-switch input').focus();
    await page.locator('#input-switch input').blur();
    await expect(page.locator('#switch')).toContainText('switch Error');

    await page.locator('#input-checkbox input').click();
    await page.locator('#input-textField input').fill('test');
    await page.locator('#input-select > div > div').click();
    await page.locator('.MuiPopover-root ul > li:first-child').click();
    await page.locator('#input-switch input').click();
    await page.locator('#input-switch input').blur();

    await expect(page.locator('p')).toHaveCount(0);
    await expect(page.locator('#renderCount')).toContainText('9');
  });

  test('should validate the form with onChange mode and reset the form', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/controller/onChange');

    await page.locator('#input-checkbox input').click();
    await page.locator('#input-checkbox input').click();
    await expect(page.locator('#Checkbox')).toContainText('Checkbox Error');

    await page.locator('#input-textField input').fill('test');
    await page.locator('#input-textField input').clear();
    await expect(page.locator('#TextField')).toContainText('TextField Error');

    await page.locator('#input-switch input').click();
    await page.locator('#input-switch input').click();
    await expect(page.locator('#switch')).toContainText('switch Error');

    await page.locator('#input-checkbox input').click();
    await page.locator('#input-textField input').fill('test');
    await page.locator('#input-switch input').click();

    await expect(page.locator('p')).toHaveCount(0);
    await expect(page.locator('#renderCount')).toContainText('7');
  });
});
