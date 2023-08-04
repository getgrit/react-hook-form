import { expect, test } from '@playwright/test';

test.describe('watchUseFieldArrayNested', () => {
  test('should watch the correct nested field array', async ({ page }) => {
    await page.goto('http://localhost:3000/watchUseFieldArrayNested');

    const expected = [
      {
        firstName: 'Bill',
        keyValue: [{ name: '1a' }, { name: '1c' }],
        lastName: 'Luo',
      },
    ];

    expect(JSON.parse(await page.locator('#result').textContent())).toEqual(
      expected,
    );

    await page.locator(`#nest-append-0`).click();
    await page.locator(`#nest-prepend-0`).click();
    await page.locator(`#nest-insert-0`).click();
    await page.locator(`#nest-swap-0`).click();
    await page.locator(`#nest-move-0`).click();

    const expected1 = [
      {
        firstName: 'Bill',
        keyValue: [
          { name: 'insert' },
          { name: 'prepend' },
          { name: '1a' },
          { name: '1c' },
          { name: 'append' },
        ],
        lastName: 'Luo',
      },
    ];

    expect(JSON.parse(await page.locator('#result').textContent())).toEqual(
      expected1,
    );

    await page.locator('#nest-update-0').click();

    const expected2 = [
      {
        firstName: 'Bill',
        keyValue: [
          { name: 'billUpdate' },
          { name: 'prepend' },
          { name: '1a' },
          { name: '1c' },
          { name: 'append' },
        ],
        lastName: 'Luo',
      },
    ];

    expect(JSON.parse(await page.locator('#result').textContent())).toEqual(
      expected2,
    );

    await page.locator(`#nest-remove-0`).click();

    await page.locator('#submit').click();

    const expected9 = [
      {
        firstName: 'Bill',
        keyValue: [
          { name: 'billUpdate' },
          { name: '1a' },
          { name: '1c' },
          { name: 'append' },
        ],
        lastName: 'Luo',
      },
    ];

    expect(JSON.parse(await page.locator('#result').textContent())).toEqual(
      expected9,
    );

    await page.locator('#prepend').click();
    await page.locator('#append').click();
    await page.locator('#swap').click();
    await page.locator('#insert').click();

    const expected3 = [
      { firstName: 'prepend', keyValue: [] },
      { firstName: 'insert', keyValue: [] },
      { firstName: 'append', keyValue: [] },
      {
        firstName: 'Bill',
        lastName: 'Luo',
        keyValue: [
          { name: 'billUpdate' },
          { name: '1a' },
          { name: '1c' },
          { name: 'append' },
        ],
      },
    ];

    expect(JSON.parse(await page.locator('#result').textContent())).toEqual(
      expected3,
    );

    await page.locator(`#nest-append-0`).click();
    await page.locator(`#nest-prepend-0`).click();
    await page.locator(`#nest-insert-0`).click();
    await page.locator(`#nest-swap-0`).click();
    await page.locator(`#nest-move-0`).click();

    const expected4 = [
      {
        firstName: 'prepend',
        keyValue: [{ name: 'insert' }, { name: 'prepend' }, { name: 'append' }],
      },
      { firstName: 'insert', keyValue: [] },
      { firstName: 'append', keyValue: [] },
      {
        firstName: 'Bill',
        lastName: 'Luo',
        keyValue: [
          { name: 'billUpdate' },
          { name: '1a' },
          { name: '1c' },
          { name: 'append' },
        ],
      },
    ];

    expect(JSON.parse(await page.locator('#result').textContent())).toEqual(
      expected4,
    );

    await page.locator('#nest-remove-3').click();
    await page.locator('#nest-remove-3').click();

    const expected5 = [
      {
        firstName: 'prepend',
        keyValue: [{ name: 'insert' }, { name: 'prepend' }, { name: 'append' }],
      },
      { firstName: 'insert', keyValue: [] },
      { firstName: 'append', keyValue: [] },
      {
        firstName: 'Bill',
        lastName: 'Luo',
        keyValue: [{ name: 'billUpdate' }, { name: 'append' }],
      },
    ];

    expect(JSON.parse(await page.locator('#result').textContent())).toEqual(
      expected5,
    );

    await page.locator('#nest-remove-all-3').click();
    await page.locator('#nest-remove-all-2').click();
    await page.locator('#nest-remove-all-1').click();
    await page.locator('#nest-remove-all-0').click();

    const expected6 = [
      { firstName: 'prepend', keyValue: [] },
      { firstName: 'insert', keyValue: [] },
      { firstName: 'append', keyValue: [] },
      { firstName: 'Bill', lastName: 'Luo', keyValue: [] },
    ];

    expect(JSON.parse(await page.locator('#result').textContent())).toEqual(
      expected6,
    );

    await page.locator('#update').click();

    const expected7 = [
      { firstName: 'BillUpdate', keyValue: [] },
      { firstName: 'insert', keyValue: [] },
      { firstName: 'append', keyValue: [] },
      { firstName: 'Bill', lastName: 'Luo', keyValue: [] },
    ];

    expect(JSON.parse(await page.locator('#result').textContent())).toEqual(
      expected7,
    );

    await page.locator('#remove').click();
    await page.locator('#remove').click();
    await page.locator('#remove').click();

    const expected8 = [{ firstName: 'BillUpdate', keyValue: [] }];

    expect(JSON.parse(await page.locator('#result').textContent())).toEqual(
      expected8,
    );

    await expect(page.locator('#count')).toContainText('36');

    await page.locator('#removeAll').click();

    await expect(page.locator('#result').textContent()).resolves.toBe('[]');
  });
});
