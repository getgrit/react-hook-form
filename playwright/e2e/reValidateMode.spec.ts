import { expect, test } from '@playwright/test';

test.describe('re-validate mode', () => {
  test('should re-validate the form only onSubmit with mode onSubmit and reValidateMode onSubmit', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/re-validate-mode/onSubmit/onSubmit');

    await page.locator('button#submit').click();

    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'firstName error',
    );
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'lastName error',
    );

    await page.locator('input[name="firstName"]').fill('luo123456');
    await page.locator('input[name="lastName"]').fill('luo12');

    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'firstName error',
    );
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'lastName error',
    );

    await page.locator('button#submit').click();

    await expect(page.locator('p')).toHaveCount(0);
    await expect(page.locator('#renderCount')).toHaveText('4');
  });

  test('should re-validate the form only onBlur with mode onSubmit and reValidateMode onBlur', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/re-validate-mode/onSubmit/onBlur');
    await page.locator('input[name="firstName"]').click();
    await page.locator('input[name="firstName"]').press('Tab');

    await page.locator('input[name="lastName"]').click();
    await page.locator('input[name="lastName"]').press('Tab');
    await expect(page.locator('p')).toHaveCount(0);

    await page.locator('button#submit').click();

    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'firstName error',
    );
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'lastName error',
    );

    await page.locator('input[name="firstName"]').fill('luo123456');
    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'firstName error',
    );
    await page.locator('input[name="firstName"]').press('Tab');
    await page.locator('input[name="lastName"]').fill('luo12');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'lastName error',
    );
    await page.locator('input[name="lastName"]').press('Tab');

    await expect(page.locator('p')).toHaveCount(0);
    await expect(page.locator('#renderCount')).toHaveText('4');
  });

  test('should re-validate the form only onSubmit with mode onBlur and reValidateMode onSubmit', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/re-validate-mode/onBlur/onSubmit');

    await page.locator('button#submit').click();

    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'firstName error',
    );
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'lastName error',
    );

    await page.locator('input[name="firstName"]').fill('luo123456');
    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'firstName error',
    );
    await page.locator('input[name="firstName"]').press('Tab');
    await page.locator('input[name="lastName"]').fill('luo12');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'lastName error',
    );
    await page.locator('input[name="lastName"]').press('Tab');

    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'firstName error',
    );
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'lastName error',
    );

    await page.locator('button#submit').click();

    await expect(page.locator('p')).toHaveCount(0);
    await expect(page.locator('#renderCount')).toHaveText('4');
  });

  test('should re-validate the form only onSubmit with mode onChange and reValidateMode onSubmit', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/re-validate-mode/onChange/onSubmit');

    await page.locator('button#submit').click();

    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'firstName error',
    );
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'lastName error',
    );

    await page.locator('input[name="firstName"]').fill('luo123456');
    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'firstName error',
    );
    await page.locator('input[name="lastName"]').fill('luo12');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'lastName error',
    );

    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'firstName error',
    );
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'lastName error',
    );

    await page.locator('button#submit').click();

    await expect(page.locator('p')).toHaveCount(0);
    await expect(page.locator('#renderCount')).toHaveText('4');
  });

  test('should re-validate the form onBlur only with mode onBlur and reValidateMode onBlur', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/re-validate-mode/onBlur/onBlur');

    await page.locator('input[name="firstName"]').click();
    await page.locator('input[name="firstName"]').press('Tab');
    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'firstName error',
    );
    await page.locator('input[name="lastName"]').click();
    await page.locator('input[name="lastName"]').press('Tab');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'lastName error',
    );

    await page.locator('input[name="firstName"]').fill('luo123456');
    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'firstName error',
    );
    await page.locator('input[name="firstName"]').press('Tab');
    await page.locator('input[name="lastName"]').fill('luo12');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'lastName error',
    );
    await page.locator('input[name="lastName"]').press('Tab');

    await expect(page.locator('p')).toHaveCount(0);
    await expect(page.locator('#renderCount')).toHaveText('5');
  });

  test('should re-validate the form onChange with mode onBlur and reValidateMode onChange', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/re-validate-mode/onBlur/onChange');

    await page.locator('input[name="firstName"]').click();
    await page.locator('input[name="firstName"]').press('Tab');
    await expect(page.locator('input[name="firstName"] + p')).toHaveText(
      'firstName error',
    );
    await page.locator('input[name="lastName"]').click();
    await page.locator('input[name="lastName"]').press('Tab');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText(
      'lastName error',
    );

    await page.locator('input[name="firstName"]').fill('');
    await page.locator('input[name="lastName"]').fill('');

    await page.locator('button#submit').click();

    await page.locator('input[name="firstName"]').fill('luo123456');
    await page.locator('input[name="lastName"]').fill('luo12');

    await expect(page.locator('p')).toHaveCount(0);
    await expect(page.locator('#renderCount')).toHaveText('6');
  });
});
