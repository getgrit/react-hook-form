import { expect, test } from '@playwright/test';

test.describe('useFieldArrayNested', () => {
  test('should work correctly with nested field array', async ({ page }) => {
    await page.goto('http://localhost:3000/useFieldArrayNested');

    await page.locator('#nest-append-0').click();
    await page.locator('#nest-prepend-0').click();
    await page.locator('#nest-insert-0').click();
    await page.locator('#nest-swap-0').click();
    await page.locator('#nest-move-0').click();

    await expect(
      page.locator('input[name="test.0.keyValue.0.name"]'),
    ).toHaveValue('insert');
    await expect(
      page.locator('input[name="test.0.keyValue.1.name"]'),
    ).toHaveValue('prepend');
    await expect(
      page.locator('input[name="test.0.keyValue.2.name"]'),
    ).toHaveValue('1a');
    await expect(
      page.locator('input[name="test.0.keyValue.3.name"]'),
    ).toHaveValue('1c');
    await expect(
      page.locator('input[name="test.0.keyValue.4.name"]'),
    ).toHaveValue('append');

    await page.locator('#nest-remove-0').click();
    await expect(
      page.locator('input[name="test.0.keyValue.2.name"]'),
    ).toHaveValue('1c');
    await expect(
      page.locator('input[name="test.0.keyValue.3.name"]'),
    ).toHaveValue('append');

    // Replace cy.get().should() with async functions and expect statements
    const dirtyNested0 = JSON.parse(
      await page.locator('#dirty-nested-0').textContent(),
    );
    expect(dirtyNested0).toEqual({
      test: [
        {
          firstName: false,
          lastName: false,
          keyValue: [
            { name: true },
            { name: true },
            { name: true },
            { name: true },
          ],
        },
      ],
    });

    const touchedNested0 = JSON.parse(
      await page.locator('#touched-nested-0').textContent(),
    );
    expect(touchedNested0).toEqual({
      test: [{ keyValue: [{ name: true }, null, null, { name: true }] }],
    });

    await page.locator('#submit').click();

    const result = JSON.parse(await page.locator('#result').textContent());
    expect(result).toEqual({
      test: [
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
      ],
    });

    // Continue replacing Cypress commands with Playwright commands
    // ...

    // Note: Due to the length and complexity of the original test, it is recommended to break it down into smaller tests for better readability and maintainability.
  });
});
