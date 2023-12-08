import { expect, test } from '@playwright/test';

async function getIframe(page) {
  const frames = page.frames();
  const iframe = frames[1]; // change index accordingly if you have multiple iframes
  return iframe;
}

test.describe('Cross-Frame rendering', () => {
  test('should work correctly when rendering inside frames', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/crossFrameForm');
    const frame = await getIframe(page);
    await frame.locator('input[type="text"]').fill('test');
    await frame.locator('input[type="radio"][value="a"]').click();
    await frame.locator('input[type="radio"][value="b"]').click();
    await expect(frame.locator('pre')).toContainText(
      '{"input":"test","radio":"b"}',
    );
  });
});
