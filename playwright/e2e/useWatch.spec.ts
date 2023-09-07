
import { test, expect } from '@playwright/test';

test.describe('useWatch', () => {
  test.skip('should only trigger render when interact with input 1', async ({ page }) => {
    await page.goto('http://localhost:3000/useWatch');
    await page.locator('input[name="test"]').fill('t');

    await expect(page.locator('#parentCounter')).toContainText('1');
    await expect(page.locator('#childCounter')).toContainText('1');
    await expect(page.locator('#grandChildCounter').first()).toContainText('2');
    await expect(page.locator('#grandChild1Counter')).toContainText('2');
    await expect(page.locator('#grandChild2Counter')).toContainText('2');
    await expect(page.locator('#grandchild01')).toHaveText('t');
    await expect(page.locator('#grandchild00')).toHaveText('t');

    await page.locator('input[name="test"]').fill('h');
    await expect(page.locator('#grandchild00')).toHaveText('th');
    await expect(page.locator('#grandchild01')).toHaveText('th');
    await expect(page.locator('#grandchild2')).toContainText('t');
  });

  test.skip('should only trigger render when interact with input 2', async ({ page }) => {
    await page.goto('http://localhost:3000/useWatch');
    await page.locator('input[name="test1"]').fill('h');

    await expect(page.locator('#parentCounter')).toContainText('1');
    await expect(page.locator('#childCounter')).toContainText('1');
    await expect(page.locator('#grandChildCounter').first()).toContainText('2');
    await expect(page.locator('#grandChild1Counter')).toContainText('2');
    await expect(page.locator('#grandChild2Counter')).toContainText('2');

    await page.locator('input[name="test1"]').fill('h');
    await page.locator('input[name="test"]').fill('h');
    await expect(page.locator('#grandchild00')).toHaveText('h');
    await expect(page.locator('#grandchild01')).toHaveText('h');
    await expect(page.locator('#grandchild1')).toContainText('hh');
    await expect(page.locator('#grandchild2')).toHaveText('hhh');
  });

  test.skip('should only trigger render when interact with input 3', async ({ page }) => {
    await page.goto('http://localhost:3000/useWatch');
    await page.locator('input[name="test2"]').fill('e');

    await expect(page.locator('#parentCounter')).toContainText('1');
    await expect(page.locator('#childCounter')).toContainText('1');
    await expect(page.locator('#grandChildCounter').first()).toContainText('2');
    await expect(page.locator('#grandChild1Counter')).toContainText('2');
    await expect(page.locator('#grandChild2Counter')).toContainText('2');

    await page.locator('input[name="test2"]').fill('eh');

    await page.locator('input[name="test1"]').fill('eh');
    await page.locator('input[name="test"]').fill('eh');
    await expect(page.locator('#grandchild00')).toHaveText('eh');
    await expect(page.locator('#grandchild01')).toHaveText('eh');
    await expect(page.locator('#grandchild1')).toContainText('eh');
    await expect(page.locator('#grandchild2')).toHaveText('eheheeh');
  });
});
