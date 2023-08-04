import { expect, test } from '@playwright/test';

test.describe('useFieldArrayUnregister', () => {
  test('should behaviour correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/UseFieldArrayUnregister');

    await page.locator('#field0').fill('bill');

    await page.locator('input[name="data.0.conditional"]').type('test');

    await expect(page.locator('#dirtyFields')).toContainText(
      JSON.stringify({
        data: [{ name: true, conditional: true }],
      }),
    );

    await page.locator('input[name="data.0.conditional"]').press('Tab');

    await expect(page.locator('#touched')).toContainText(
      JSON.stringify([{ name: true, conditional: true }]),
    );

    await page.locator('#prepend').click();

    await expect(
      page.locator('input[name="data.0.conditional"]'),
    ).not.toBeVisible();
    await expect(page.locator('input[name="data.1.conditional"]')).toHaveValue(
      '',
    );

    await expect(page.locator('#dirtyFields')).toContainText(
      JSON.stringify({
        data: [
          { name: true },
          { name: true, conditional: true },
          { name: true },
          { name: true },
        ],
      }),
    );

    await expect(page.locator('#touched')).toContainText(
      JSON.stringify([null, { name: true, conditional: true }]),
    );

    await page.locator('input[name="data.0.name"]').press('Tab');

    await page.locator('#swap').click();

    await expect(
      page.locator('input[name="data.1.conditional"]'),
    ).not.toBeVisible();
    await expect(page.locator('input[name="data.2.conditional"]')).toHaveValue(
      '',
    );

    await expect(page.locator('#dirtyFields')).toContainText(
      JSON.stringify({
        data: [
          { name: true },
          { name: false },
          { name: true, conditional: true },
          { name: true },
        ],
      }),
    );

    await expect(page.locator('#touched')).toContainText(
      JSON.stringify([{ name: true }, null, { name: true, conditional: true }]),
    );

    await page.locator('#insert').click();

    await page.locator('#insert').click();

    await page.locator('input[name="data.4.name"]').type('test');

    await expect(page.locator('#dirtyFields')).toContainText(
      JSON.stringify({
        data: [
          { name: true },
          { name: true },
          { name: true },
          { name: true },
          { name: true, conditional: true },
          { name: true },
        ],
      }),
    );

    await expect(page.locator('#touched')).toContainText(
      JSON.stringify([
        { name: true },
        { name: true },
        { name: true },
        null,
        { name: true, conditional: true },
      ]),
    );

    await page.locator('#move').click();

    await page.locator('input[name="data.2.name"]').fill('bill');

    await expect(page.locator('input[name="data.2.conditional"]')).toHaveValue(
      '',
    );

    await expect(page.locator('#dirtyFields')).toContainText(
      JSON.stringify({
        data: [
          { name: true },
          { name: true },
          { name: true, conditional: true },
          { name: true },
          { name: true },
          { name: true },
        ],
      }),
    );

    await expect(page.locator('#touched')).toContainText(
      JSON.stringify([
        { name: true },
        { name: true },
        { name: true, conditional: true },
        { name: true },
        null,
      ]),
    );

    await page.locator('#delete1').click();

    await expect(page.locator('input[name="data.1.conditional"]')).toHaveValue(
      '',
    );

    await page.locator('#submit').click();

    await expect(page.locator('#result')).toContainText(
      JSON.stringify({
        data: [
          { name: '5' },
          { name: 'bill', conditional: '' },
          { name: '10' },
          { name: 'test1' },
          { name: 'test2' },
        ],
      }),
    );

    await page.locator('input[name="data.3.name"]').type('test');

    await page.locator('#submit').click();

    await expect(page.locator('#result')).toContainText(
      JSON.stringify({
        data: [
          { name: '5' },
          { name: 'bill', conditional: '' },
          { name: '10' },
          { name: 'test1test' },
          { name: 'test2' },
        ],
      }),
    );

    await page.locator('#delete3').click();

    await page.locator('#submit').click();

    await expect(page.locator('#result')).toContainText(
      JSON.stringify({
        data: [
          { name: '5' },
          { name: 'bill', conditional: '' },
          { name: '10' },
          { name: 'test2' },
        ],
      }),
    );

    await expect(page.locator('#renderCount')).toContainText('32');
  });
});
