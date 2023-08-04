import { expect, test } from '@playwright/test';

test.describe('useFieldArray', () => {
  test('should behaviour correctly without defaultValues', async ({ page }) => {
    await page.goto('http://localhost:3000/useFieldArray/normal');

    await page.locator('#append').click();
    await expect(page.locator('ul > li')).toHaveCount(1);

    await page.locator('#submit').click();
    await expect(page.locator('#result')).toContainText(
      JSON.stringify({
        data: [{ name: '2' }],
      }),
    );

    await page.locator('#prepend').click();
    await expect(page.locator('ul > li')).toHaveCount(2);

    // await expect(page.locator('ul > li').nth(0)).toContainText('7');

    await page.locator('#append').click();
    await expect(page.locator('ul > li')).toHaveCount(3);

    // await expect(page.locator('ul > li').nth(2)).toContainText('9');

    await page.locator('#submit').click();
    await expect(page.locator('#result')).toContainText(
      JSON.stringify({
        data: [{ name: '7' }, { name: '2' }, { name: '9' }],
      }),
    );

    await page.locator('#swap').click();
    // await expect(page.locator('ul > li').nth(1)).toContainText('9');
    // await expect(page.locator('ul > li').nth(2)).toContainText('2');

    await page.locator('#submit').click();
    await expect(page.locator('#result')).toContainText(
      JSON.stringify({
        data: [{ name: '7' }, { name: '9' }, { name: '2' }],
      }),
    );

    await page.locator('#move').click();
    // await expect(page.locator('ul > li').nth(0)).toContainText('2');
    // await expect(page.locator('ul > li').nth(1)).toContainText('7');

    await page.locator('#submit').click();
    await expect(page.locator('#result')).toContainText(
      JSON.stringify({
        data: [{ name: '2' }, { name: '7' }, { name: '9' }],
      }),
    );

    await page.locator('#insert').click();
    // await expect(page.locator('ul > li').nth(1)).toContainText('22');

    await page.locator('#submit').click();
    await expect(page.locator('#result')).toContainText(
      JSON.stringify({
        data: [{ name: '2' }, { name: '22' }, { name: '7' }, { name: '9' }],
      }),
    );

    await page.locator('#remove').click();
    // await expect(page.locator('ul > li').nth(0)).toContainText('2');
    // await expect(page.locator('ul > li').nth(1)).toContainText('7');

    await page.locator('#submit').click();
    await expect(page.locator('#result')).toContainText(
      JSON.stringify({
        data: [{ name: '2' }, { name: '7' }, { name: '9' }],
      }),
    );

    await page.locator('#delete1').click();

    await expect(page.locator('ul > li')).toHaveCount(2);

    // await expect(page.locator('ul > li').nth(0)).toContainText('2');
    // await expect(page.locator('ul > li').nth(1)).toContainText('9');

    await page.locator('#delete1').click();

    await expect(page.locator('ul > li')).toHaveCount(1);

    // await expect(page.locator('ul > li').nth(0)).toContainText('2');

    await page.locator('#submit').click();
    await expect(page.locator('#result')).toContainText(
      JSON.stringify({
        data: [{ name: '2' }],
      }),
    );

    await page.locator('#update').click();

    // await expect(page.locator('ul > li').nth(0)).toContainText('changed');

    await page.locator('#removeAll').click();
    await expect(page.locator('ul > li')).toHaveCount(0);

    await page.locator('#submit').click();
    await expect(page.locator('#result')).toContainText(
      JSON.stringify({
        data: [],
      }),
    );

    await page.locator('#append').click();
    await page.locator('#append').click();
    await page.locator('#append').click();

    await page.locator('#removeAsync').click();
    await page.locator('#removeAsync').click();

    await expect(page.locator('input')).toHaveCount(1);

    await page.locator('#submit').click();

    await expect(page.locator('#result')).toContainText(
      JSON.stringify({
        data: [{ name: '41' }],
      }),
    );

    await expect(page.locator('#renderCount')).toContainText('54');
  });

  // ... other tests
});
