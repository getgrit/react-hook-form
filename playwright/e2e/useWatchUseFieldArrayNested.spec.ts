import { expect, test } from '@playwright/test';

test.describe('useWatchUseFieldArrayNested', () => {
  test('should watch the correct nested field array', async ({ page }) => {
    await page.goto('http://localhost:3000/useWatchUseFieldArrayNested');

    const getResult = async () => {
      const resultContent = await page.locator('#result').textContent();
      return JSON.parse(resultContent);
    };

    const expected1 = [
      {
        firstName: 'Bill',
        keyValue: [{ name: '1a' }, { name: '1c' }],
        lastName: 'Luo',
      },
    ];
    expect(await getResult()).toEqual(expected1);

    await page.locator('#nest-append-0').click();
    await page.locator('#nest-prepend-0').click();
    await page.locator('#nest-insert-0').click();
    await page.locator('#nest-swap-0').click();
    await page.locator('#nest-move-0').click();

    const expected2 = [
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
    expect(await getResult()).toEqual(expected2);

    await page.locator('#nest-remove-0').click();

    await page.locator('#submit').click();

    const expected3 = [
      {
        firstName: 'Bill',
        keyValue: [
          { name: 'insert' },
          { name: '1a' },
          { name: '1c' },
          { name: 'append' },
        ],
        lastName: 'Luo',
      },
    ];
    expect(await getResult()).toEqual(expected3);

    await page.locator('#prepend').click();
    await page.locator('#append').click();
    await page.locator('#swap').click();
    await page.locator('#insert').click();

    const expected4 = [
      { firstName: 'prepend', keyValue: [] },
      { firstName: 'insert', keyValue: [] },
      { firstName: 'append', keyValue: [] },
      {
        firstName: 'Bill',
        keyValue: [
          { name: 'insert' },
          { name: '1a' },
          { name: '1c' },
          { name: 'append' },
        ],
        lastName: 'Luo',
      },
    ];
    expect(await getResult()).toEqual(expected4);

    await page.locator('#nest-append-0').click();
    await page.locator('#nest-prepend-0').click();
    await page.locator('#nest-insert-0').click();
    await page.locator('#nest-swap-0').click();
    await page.locator('#nest-move-0').click();

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
        keyValue: [
          { name: 'insert' },
          { name: '1a' },
          { name: '1c' },
          { name: 'append' },
        ],
      },
    ];
    expect(await getResult()).toEqual(expected5);

    await page.locator('#nest-update-3').click();

    await expect(
      page.locator('input[name="test.3.keyValue.2.name"]'),
    ).toHaveValue('update');

    const expected6 = [
      {
        firstName: 'prepend',
        keyValue: [{ name: 'insert' }, { name: 'prepend' }, { name: 'append' }],
      },
      { firstName: 'insert', keyValue: [] },
      { firstName: 'append', keyValue: [] },
      {
        firstName: 'Bill',
        keyValue: [
          { name: 'insert' },
          { name: '1a' },
          { name: 'update' },
          { name: 'append' },
        ],
        lastName: 'Luo',
      },
    ];
    expect(await getResult()).toEqual(expected6);

    await page.locator('#nest-update-0').click();

    const expected7 = [
      {
        firstName: 'prepend',
        keyValue: [{ name: 'insert' }, { name: 'prepend' }, { name: 'update' }],
      },
      { firstName: 'insert', keyValue: [] },
      { firstName: 'append', keyValue: [] },
      {
        firstName: 'Bill',
        lastName: 'Luo',
        keyValue: [
          { name: 'insert' },
          { name: '1a' },
          { name: 'update' },
          { name: 'append' },
        ],
      },
    ];
    expect(await getResult()).toEqual(expected7);

    await page.locator('#nest-remove-3').click();
    await page.locator('#nest-remove-3').click();

    const expected8 = [
      {
        firstName: 'prepend',
        keyValue: [{ name: 'insert' }, { name: 'prepend' }, { name: 'update' }],
      },
      { firstName: 'insert', keyValue: [] },
      { firstName: 'append', keyValue: [] },
      {
        firstName: 'Bill',
        lastName: 'Luo',
        keyValue: [{ name: 'insert' }, { name: 'append' }],
      },
    ];
    expect(await getResult()).toEqual(expected8);

    await page.locator('#nest-remove-all-3').click();
    await page.locator('#nest-remove-all-2').click();
    await page.locator('#nest-remove-all-1').click();
    await page.locator('#nest-remove-all-0').click();

    const expected9 = [
      { firstName: 'prepend', keyValue: [] },
      { firstName: 'insert', keyValue: [] },
      { firstName: 'append', keyValue: [] },
      { firstName: 'Bill', lastName: 'Luo', keyValue: [] },
    ];
    expect(await getResult()).toEqual(expected9);

    await page.locator('#remove').click();
    await page.locator('#remove').click();
    await page.locator('#remove').click();

    const expected10 = [{ firstName: 'prepend', keyValue: [] }];
    expect(await getResult()).toEqual(expected10);

    await expect(page.locator('#count')).toHaveText('8');
  });
});
