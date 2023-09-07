
import { test, expect } from '@playwright/test';

test.describe('watch form validation', () => {
  test('should watch all inputs', async ({ page }) => {
    await page.goto('http://localhost:3000/watch');

    expect(JSON.parse(await page.locator('#watchAll').textContent())).toEqual({});

    await expect(page.locator('#HideTestSingle')).not.toBeVisible();
    await page.locator('input[name="testSingle"]').fill('testSingle');
    await expect(page.locator('#HideTestSingle')).toHaveText('Hide Content TestSingle');
    expect(JSON.parse(await page.locator('#watchAll').textContent())).toEqual({
      testSingle: 'testSingle',
      test: ['', ''],
      testObject: { firstName: '', lastName: '' },
      toggle: false,
    });

    await page.locator('input[name="test.0"]').fill('bill');
    await page.locator('input[name="test.1"]').fill('luo');
    await expect(page.locator('#testData')).toHaveText('["bill","luo"]');
    expect(JSON.parse(await page.locator('#testArray').textContent())).toEqual(['bill', 'luo']);

    expect(JSON.parse(await page.locator('#watchAll').textContent())).toEqual({
      testSingle: 'testSingle',
      test: ['bill', 'luo'],
      testObject: { firstName: '', lastName: '' },
      toggle: false,
    });

    await page.locator('input[name="testObject.firstName"]').fill('bill');
    await page.locator('input[name="testObject.lastName"]').fill('luo');
    expect(JSON.parse(await page.locator('#testObject').textContent())).toEqual({
      firstName: 'bill',
      lastName: 'luo',
    });

    expect(JSON.parse(await page.locator('#testArray').textContent())).toEqual(['bill', 'luo']);

    expect(JSON.parse(await page.locator('#watchAll').textContent())).toEqual({
      testSingle: 'testSingle',
      test: ['bill', 'luo'],
      testObject: { firstName: 'bill', lastName: 'luo' },
      toggle: false,
    });

    await expect(page.locator('#hideContent')).not.toBeVisible();
    await page.locator('input[name="toggle"]').check();
    await expect(page.locator('#hideContent')).toHaveText('Hide Content');

    expect(JSON.parse(await page.locator('#watchAll').textContent())).toEqual({
      testSingle: 'testSingle',
      test: ['bill', 'luo'],
      testObject: { firstName: 'bill', lastName: 'luo' },
      toggle: true,
    });
  });
});
