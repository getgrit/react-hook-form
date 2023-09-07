
import { test, expect } from '@playwright/test';

test.describe('setValue with react native or web', () => {
  test('should only trigger re-render when form state changed or error triggered', async ({ page }) => {
    await page.goto('http://localhost:3000/setValueCustomRegister');
    await expect(page.locator('#dirty')).toHaveText('false');
    await page.locator('#TriggerDirty').click();
    await expect(page.locator('#dirty')).toHaveText('true');
    await page.locator('#TriggerNothing').click();
    await page.locator('#TriggerNothing').click();
    await page.locator('#TriggerNothing').click();
    await page.locator('#TriggerNothing').click();
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('2');

    await page.locator('#WithError').click();
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('3');
    await page.locator('#WithError').click();
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('4');

    await page.locator('#WithoutError').click();
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('5');
    await page.locator('#WithoutError').click();
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('6');

    await page.locator('#WithError').click();
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('7');

    await page.locator('#TriggerNothing').click();
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('7');
  });
});
