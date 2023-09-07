
import { test, expect } from '@playwright/test';

test.describe('useWatchUseFieldArrayNested', () => {
  test('should watch the correct nested field array', async ({ page }) => {
    await page.goto('http://localhost:3000/useWatchUseFieldArrayNested');

    const getResult = async () => JSON.parse(await page.locator('#result').textContent());

    expect(await getResult()).toEqual([
      {
        firstName: 'Bill',
        keyValue: [{ name: '1a' }, { name: '1c' }],
        lastName: 'Luo',
      },
    ]);

    await page.locator('#nest-append-0').click();
    await page.locator('#nest-prepend-0').click();
    await page.locator('#nest-insert-0').click();
    await page.locator('#nest-swap-0').click();
    await page.locator('#nest-move-0').click();

    expect(await getResult()).toEqual([
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
    ]);

    await page.locator('#nest-remove-0').click();

    await page.locator('#submit').click();

    expect(await getResult()).toEqual([
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
    ]);

    await page.locator('#prepend').click();
    await page.locator('#append').click();
    await page.locator('#swap').click();
    await page.locator('#insert').click();

    expect(await getResult()).toEqual([
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
    ]);

    await page.locator('#nest-append-0').click();
    await page.locator('#nest-prepend-0').click();
    await page.locator('#nest-insert-0').click();
    await page.locator('#nest-swap-0').click();
    await page.locator('#nest-move-0').click();

    expect(await getResult()).toEqual([
      {
        firstName: 'prepend',
        keyValue: [
          { name: 'insert' },
          { name: 'prepend' },
          { name: 'append' },
        ],
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
    ]);

    await page.locator('#nest-update-3').click();

    await expect(page.locator('input[name="test.3.keyValue.2.name"]')).toHaveValue('update');

    expect(await getResult()).toEqual([
      {
        firstName: 'prepend',
        keyValue: [
          { name: 'insert' },
          { name: 'prepend' },
          { name: 'append' },
        ],
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
    ]);

    await page.locator('#nest-update-0').click();

    expect(await getResult()).toEqual([
      {
        firstName: 'prepend',
        keyValue: [
          { name: 'insert' },
          { name: 'prepend' },
          { name: 'update' },
        ],
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
    ]);

    await page.locator('#nest-remove-3').click();
    await page.locator('#nest-remove-3').click();

    expect(await getResult()).toEqual([
      {
        firstName: 'prepend',
        keyValue: [
          { name: 'insert' },
          { name: 'prepend' },
          { name: 'update' },
        ],
      },
      { firstName: 'insert', keyValue: [] },
      { firstName: 'append', keyValue: [] },
      {
        firstName: 'Bill',
        lastName: 'Luo',
        keyValue: [{ name: 'insert' }, { name: 'append' }],
      },
    ]);

    await page.locator('#nest-remove-all-3').click();
    await page.locator('#nest-remove-all-2').click();
    await page.locator('#nest-remove-all-1').click();
    await page.locator('#nest-remove-all-0').click();

    expect(await getResult()).toEqual([
      { firstName: 'prepend', keyValue: [] },
      { firstName: 'insert', keyValue: [] },
      { firstName: 'append', keyValue: [] },
      { firstName: 'Bill', lastName: 'Luo', keyValue: [] },
    ]);

    await page.locator('#remove').click();
    await page.locator('#remove').click();
    await page.locator('#remove').click();

    expect(await getResult()).toEqual([
      { firstName: 'prepend', keyValue: [] },
    ]);

    await expect(page.locator('#count')).toHaveText('8');
  });
});
