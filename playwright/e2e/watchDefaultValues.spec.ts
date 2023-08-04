import { expect, test } from '@playwright/test';

test.describe('watchDefaultValues', () => {
  test('should return default value with watch', async ({ page }) => {
    await page.goto('http://localhost:3000/watch-default-values');

    const expectedWatchAll =
      '{"test":"test","test1":{"firstName":"firstName","lastName":["lastName0","lastName1"],"deep":{"nest":"nest"}},"flatName[1]":{"whatever":"flat"}}';
    const expectedArray = '["test",{"whatever":"flat"}]';
    const expectedGetArray = '["lastName0","lastName1"]';
    const expectedObject = '["test","firstName"]';
    const expectedSingle = '"firstName"';
    const expectedSingleDeepArray = '"lastName0"';

    await expect(page.locator('#watchAll')).toHaveText(expectedWatchAll);
    await expect(page.locator('#array')).toHaveText(expectedArray);
    await expect(page.locator('#getArray')).toHaveText(expectedGetArray);
    await expect(page.locator('#object')).toHaveText(expectedObject);
    await expect(page.locator('#single')).toHaveText(expectedSingle);
    await expect(page.locator('#singleDeepArray')).toHaveText(
      expectedSingleDeepArray,
    );
  });
});
