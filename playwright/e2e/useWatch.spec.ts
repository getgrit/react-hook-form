import { expect, test } from '@playwright/test';

test.describe('useWatch', () => {
  test('should only trigger render when interact with input 1', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/useWatch');
    await page.locator('input[name="test"]').fill('t');

    await expect(page.locator('#parentCounter')).toHaveText('1');
    await expect(page.locator('#childCounter')).toHaveText('1');
    await expect(page.locator('#grandChildCounter')).toHaveText('2');
    await expect(page.locator('#grandChild1Counter')).toHaveText('2');
    await expect(page.locator('#grandChild2Counter')).toHaveText('2');
    await expect(page.locator('#grandchild01')).toHaveText('t');
    await expect(page.locator('#grandchild00')).toHaveText('t');

    await page.locator('input[name="test"]').fill('h');
    await expect(page.locator('#grandchild00')).toHaveText('th');
    await expect(page.locator('#grandchild01')).toHaveText('th');
    await expect(page.locator('#grandchild2')).toHaveText('t');
  });

  test('should only trigger render when interact with input 2', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/useWatch');
    await page.locator('input[name="test1"]').fill('h');

    await expect(page.locator('#parentCounter')).toHaveText('1');
    await expect(page.locator('#childCounter')).toHaveText('1');
    await expect(page.locator('#grandChildCounter')).toHaveText('2');
    await expect(page.locator('#grandChild1Counter')).toHaveText('2');
    await expect(page.locator('#grandChild2Counter')).toHaveText('2');

    await page.locator('input[name="test1"]').fill('h');
    await page.locator('input[name="test"]').fill('h');
    await expect(page.locator('#grandchild00')).toHaveText('h');
    await expect(page.locator('#grandchild01')).toHaveText('h');
    await expect(page.locator('#grandchild1')).toHaveText('hh');
    await expect(page.locator('#grandchild2')).toHaveText('hhh');
  });

  test('should only trigger render when interact with input 3', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/useWatch');
    await page.locator('input[name="test2"]').fill('e');

    await expect(page.locator('#parentCounter')).toHaveText('1');
    await expect(page.locator('#childCounter')).toHaveText('1');
    await expect(page.locator('#grandChildCounter')).toHaveText('2');
    await expect(page.locator('#grandChild1Counter')).toHaveText('2');
    await expect(page.locator('#grandChild2Counter')).toHaveText('2');

    await page.locator('input[name="test2"]').fill('eh');

    await page.locator('input[name="test1"]').fill('eh');
    await page.locator('input[name="test"]').fill('eh');
    await expect(page.locator('#grandchild00')).toHaveText('eh');
    await expect(page.locator('#grandchild01')).toHaveText('eh');
    await expect(page.locator('#grandchild1')).toHaveText('eh');
    await expect(page.locator('#grandchild2')).toHaveText('eheheeh');
  });
});
