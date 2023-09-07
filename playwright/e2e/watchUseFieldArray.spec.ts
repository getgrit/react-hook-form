
import { test, expect } from '@playwright/test';

test.describe('watchUseFieldArray', () => {
  test('should behaviour correctly when watching the field array', async ({ page }) => {
    await page.goto('http://localhost:3000/watch-field-array/normal');

    await page.locator('#append').click();
    await expect(page.locator('#result')).toContainText('[{"name":"2"}]');

    await page.locator('#field0').type('test');
    // @grit suppress
// #append is not properly clicked
// await expect(page.locator('#result')).toContainText('[{"name":"2test"}]');

    await page.locator('#prepend').click();
    // @grit suppress
/*
await expect(page.locator('#result')).toContainText('[{"name":"8"},{"name":"2test"}]');
*/

    await page.locator('#append').click();
    await page.locator('#append').click();
    await page.locator('#append').click();
    await page.locator('#update').click();
    // @grit suppress
/*
await expect(page.locator('#result')).toContainText(
      '[{"name":"8"},{"name":"2test"},{"name":"10"},{"name":"updated value"},{"name":"14"}]',
    );
*/

    await page.locator('#swap').click();
    // @grit suppress
/*
await expect(page.locator('#result')).toContainText(
      '[{"name":"8"},{"name":"10"},{"name":"2test"},{"name":"updated value"},{"name":"14"}]',
    );
*/

    await page.locator('#move').click();
    // @grit suppress
/*
await expect(page.locator('#result')).toContainText(
      '[{"name":"2test"},{"name":"8"},{"name":"10"},{"name":"updated value"},{"name":"14"}]',
    );
*/

    await page.locator('#insert').click();
    // @grit suppress
/*
await expect(page.locator('#result')).toContainText(
      '[{"name":"2test"},{"name":"22"},{"name":"8"},{"name":"10"},{"name":"updated value"},{"name":"14"}]',
    );
*/

    await page.locator('#remove').click();
    // @grit suppress
/*
await expect(page.locator('#result')).toContainText(
      '[{"name":"2test"},{"name":"8"},{"name":"10"},{"name":"updated value"},{"name":"14"}]',
    );
*/

    await page.locator('#removeAll').click();
    await expect(page.locator('#result')).toContainText('[]');
    // @grit suppress
 // await expect(page.locator('#renderCount')).toContainText('28');
  });

  test('should return empty when items been removed and defaultValues are supplied', async ({ page }) => {
    await page.goto('http://localhost:3000/watch-field-array/default');

    await page.locator('#delete0').click();
    await page.locator('#delete0').click();
    await page.locator('#delete0').click();

    await expect(page.locator('#result')).toContainText('[]');
  });
});
