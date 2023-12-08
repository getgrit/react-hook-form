import { expect, test } from '@playwright/test';

test.describe('watch form validation', () => {
  test('should watch all inputs', async ({ page }) => {
    await page.goto('http://localhost:3000/watch');

    await expect(page.locator('#watchAll')).toContainText('{}');

    await expect(page.locator('#HideTestSingle')).not.toBeVisible();
    await page.locator('input[name="testSingle"]').fill('testSingle');
    await expect(page.locator('#HideTestSingle')).toContainText(
      'Hide Content TestSingle',
    );
    await expect(page.locator('#watchAll')).toContainText(
      JSON.stringify({
        testSingle: 'testSingle',
        test: ['', ''],
        testObject: { firstName: '', lastName: '' },
        toggle: false,
      }),
    );

    await page.locator('input[name="test.0"]').fill('bill');
    await page.locator('input[name="test.1"]').fill('luo');
    await expect(page.locator('#testData')).toContainText('["bill","luo"]');
    await expect(page.locator('#testArray')).toContainText(
      JSON.stringify(['bill', 'luo']),
    );

    await expect(page.locator('#watchAll')).toContainText(
      JSON.stringify({
        testSingle: 'testSingle',
        test: ['bill', 'luo'],
        testObject: { firstName: '', lastName: '' },
        toggle: false,
      }),
    );

    await page.locator('input[name="testObject.firstName"]').fill('bill');
    await page.locator('input[name="testObject.lastName"]').fill('luo');
    await expect(page.locator('#testObject')).toContainText(
      JSON.stringify({
        firstName: 'bill',
        lastName: 'luo',
      }),
    );

    await expect(page.locator('#testArray')).toContainText(
      JSON.stringify(['bill', 'luo']),
    );

    await expect(page.locator('#watchAll')).toContainText(
      JSON.stringify({
        testSingle: 'testSingle',
        test: ['bill', 'luo'],
        testObject: { firstName: 'bill', lastName: 'luo' },
        toggle: false,
      }),
    );

    await expect(page.locator('#hideContent')).not.toBeVisible();
    await page.locator('input[name="toggle"]').check();
    await expect(page.locator('#hideContent')).toContainText('Hide Content');

    await expect(page.locator('#watchAll')).toContainText(
      JSON.stringify({
        testSingle: 'testSingle',
        test: ['bill', 'luo'],
        testObject: { firstName: 'bill', lastName: 'luo' },
        toggle: true,
      }),
    );
  });
});
