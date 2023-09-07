
import { test, expect } from '@playwright/test';

test.describe('useFieldArrayUnregister', () => {
  test('should behaviour correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/UseFieldArrayUnregister');

    await page.locator('#field0').fill('bill');

    await page.locator('input[name="data.0.conditional"]').type('test');

    const dirtyFields = JSON.parse(await page.locator('#dirtyFields').textContent());
    expect(dirtyFields).toEqual({ data: [{ name: true, conditional: true }] });

    await page.locator('input[name="data.0.conditional"]').blur();

    const touched = JSON.parse(await page.locator('#touched').textContent());
    expect(touched).toEqual([{ name: true, conditional: true }]);

    await page.locator('#prepend').click();

    await expect(page.locator('input[name="data.0.conditional"]')).not.toBeVisible();
    await expect(page.locator('input[name="data.1.conditional"]')).toHaveValue('');

    const dirtyFieldsAfterPrepend = JSON.parse(await page.locator('#dirtyFields').textContent());
    expect(dirtyFieldsAfterPrepend).toEqual({
      data: [
        { name: true },
        { name: true, conditional: true },
        { name: true },
        { name: true },
      ],
    });

    const touchedAfterPrepend = JSON.parse(await page.locator('#touched').textContent());
    expect(touchedAfterPrepend).toEqual([null, { name: true, conditional: true }]);

    await page.locator('input[name="data.0.name"]').blur();

    await page.locator('#swap').click();

    await expect(page.locator('input[name="data.1.conditional"]')).not.toBeVisible();
    await expect(page.locator('input[name="data.2.conditional"]')).toHaveValue('');

    const dirtyFieldsAfterSwap = JSON.parse(await page.locator('#dirtyFields').textContent());
    expect(dirtyFieldsAfterSwap).toEqual({
      data: [
        { name: true },
        { name: false },
        { name: true, conditional: true },
        { name: true },
      ],
    });

    const touchedAfterSwap = JSON.parse(await page.locator('#touched').textContent());
    expect(touchedAfterSwap).toEqual([{ name: true }, null, { name: true, conditional: true }]);

    await page.locator('#insert').click();

    await page.locator('#insert').click();

    await page.locator('input[name="data.4.name"]').type('test');

    const dirtyFieldsAfterInsert = JSON.parse(await page.locator('#dirtyFields').textContent());
    expect(dirtyFieldsAfterInsert).toEqual({
      data: [
        { name: true },
        { name: true },
        { name: true },
        { name: true },
        { name: true, conditional: true },
        { name: true },
      ],
    });

    const touchedAfterInsert = JSON.parse(await page.locator('#touched').textContent());
    expect(touchedAfterInsert).toEqual([
      { name: true },
      { name: true },
      { name: true },
      null,
      { name: true, conditional: true },
    ]);

    await page.locator('#move').click();

    await page.locator('input[name="data.2.name"]').fill('bill');

    await expect(page.locator('input[name="data.2.conditional"]')).toHaveValue('');

    const dirtyFieldsAfterMove = JSON.parse(await page.locator('#dirtyFields').textContent());
    expect(dirtyFieldsAfterMove).toEqual({
      data: [
        { name: true },
        { name: true },
        { name: true, conditional: true },
        { name: true },
        { name: true },
        { name: true },
      ],
    });

    const touchedAfterMove = JSON.parse(await page.locator('#touched').textContent());
    expect(touchedAfterMove).toEqual([
      { name: true },
      { name: true },
      { name: true, conditional: true },
      { name: true },
      null,
    ]);

    await page.locator('#delete1').click();

    await expect(page.locator('input[name="data.1.conditional"]')).toHaveValue('');

    await page.locator('#submit').click();

    const resultAfterSubmit = JSON.parse(await page.locator('#result').textContent());
    expect(resultAfterSubmit).toEqual({
      data: [
        { name: '5' },
        { name: 'bill', conditional: '' },
        { name: '10' },
        { name: 'test1' },
        { name: 'test2' },
      ],
    });

    await page.locator('input[name="data.3.name"]').type('test');

    await page.locator('#submit').click();

    const resultAfterSecondSubmit = JSON.parse(await page.locator('#result').textContent());
    // @grit suppress
/*
expect(resultAfterSecondSubmit).toEqual({
      data: [
        { name: '5' },
        { name: 'bill', conditional: '' },
        { name: '10' },
        { name: 'test1test' },
        { name: 'test2' },
      ],
    });
*/

    await page.locator('#delete3').click();

    await page.locator('#submit').click();

    const resultAfterThirdSubmit = JSON.parse(await page.locator('#result').textContent());
    expect(resultAfterThirdSubmit).toEqual({
      data: [
        { name: '5' },
        { name: 'bill', conditional: '' },
        { name: '10' },
        { name: 'test2' },
      ],
    });

    // @grit suppress
 // await expect(page.locator('#renderCount')).toContainText('32');
  });
});
