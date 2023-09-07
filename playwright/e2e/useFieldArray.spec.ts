import { test, expect } from '@playwright/test';

test.describe('useFieldArray', () => {
  test.skip('should behaviour correctly without defaultValues', async ({ page }) => {
    await page.goto('http://localhost:3000/useFieldArray/normal');

    await page.click('#append');
    expect(await page.$$eval('ul > li', (elements) => elements.length)).toBe(1);

    await page.click('#submit');
    let state = await page.$eval('#result', (el) =>
      JSON.parse(el.textContent ?? ''),
    );
    expect(state).toEqual({ data: [{ name: '2' }] });

    await page.click('#prepend');
    expect(await page.$$eval('ul > li', (elements) => elements.length)).toBe(2);

    const firstInputValue = await page.$eval(
      'ul > li:first-child > input',
      (el) => el.value,
    );
    expect(firstInputValue).toBe('7');

    await page.click('#append');
    expect(await page.$$eval('ul > li', (elements) => elements.length)).toBe(3);

    const lastInputValue = await page.$eval(
      'ul > li:last-child > input',
      (el) => el.value,
    );
    expect(lastInputValue).toBe('9');

    await page.click('#submit');
    state = await page.$eval('#result', (el) =>
      JSON.parse(el.textContent ?? ''),
    );
    expect(state).toEqual({
      data: [{ name: '7' }, { name: '2' }, { name: '9' }],
    });

    await page.click('#swap');
    const swappedValue = await page.$eval(
      'ul > li:nth-child(2) > input',
      (el) => el.value,
    );
    expect(swappedValue).toBe('9');

    const inputThirdChildValue = await page.$eval(
      'ul > li:nth-child(3) > input',
      (el) => el.value,
    );
    expect(inputThirdChildValue).toBe('2');

    await page.click('#submit');
    state = await page.$eval('#result', (el) =>
      JSON.parse(el.textContent ?? ''),
    );
    expect(state).toEqual({
      data: [{ name: '7' }, { name: '9' }, { name: '2' }],
    });

    await page.click('#move');
    const firstInputMovedValue = await page.$eval(
      'ul > li:first-child > input',
      (el) => el.value,
    );
    expect(firstInputMovedValue).toBe('2');

    const secondChildValue = await page.$eval(
      'ul > li:nth-child(2) > input',
      (el) => el.value,
    );
    expect(secondChildValue).toBe('7');

    await page.click('#submit');
    state = await page.$eval('#result', (el) =>
      JSON.parse(el.textContent ?? ''),
    );
    expect(state).toEqual({
      data: [{ name: '2' }, { name: '7' }, { name: '9' }],
    });

    await page.click('#insert');
    const insertedValue = await page.$eval(
      'ul > li:nth-child(2) > input',
      (el) => el.value,
    );
    expect(insertedValue).toBe('22');

    await page.click('#submit');
    state = await page.$eval('#result', (el) =>
      JSON.parse(el.textContent ?? ''),
    );
    expect(state).toEqual({
      data: [{ name: '2' }, { name: '22' }, { name: '7' }, { name: '9' }],
    });

    await page.click('#remove');
    const firstInputRemovedValue = await page.$eval(
      'ul > li:first-child > input',
      (el) => el.value,
    );
    expect(firstInputRemovedValue).toBe('2');

    const secondChildRemovedValue = await page.$eval(
      'ul > li:nth-child(2) > input',
      (el) => el.value,
    );
    expect(secondChildRemovedValue).toBe('7');

    await page.click('#submit');
    state = await page.$eval('#result', (el) =>
      JSON.parse(el.textContent ?? ''),
    );
    expect(state).toEqual({
      data: [{ name: '2' }, { name: '7' }, { name: '9' }],
    });

    await page.click('#delete1');
    expect(await page.$$eval('ul > li', (elements) => elements.length)).toBe(2);

    const firstDeletedValue = await page.$eval(
      'ul > li:first-child > input',
      (el) => el.value,
    );
    expect(firstDeletedValue).toBe('2');

    const secondDeletedValue = await page.$eval(
      'ul > li:nth-child(2) > input',
      (el) => el.value,
    );
    expect(secondDeletedValue).toBe('9');

    await page.click('#delete1');
    expect(await page.$$eval('ul > li', (elements) => elements.length)).toBe(1);

    const lastDeletedValue = await page.$eval(
      'ul > li:last-child > input',
      (el) => el.value,
    );
    expect(lastDeletedValue).toBe('2');

    await page.click('#submit');
    state = await page.$eval('#result', (el) =>
      JSON.parse(el.textContent ?? ''),
    );
    expect(state).toEqual({ data: [{ name: '2' }] });

    await page.click('#update');
    const updatedValue = await page.$eval(
      'ul > li:first-child > input',
      (el) => el.value,
    );
    expect(updatedValue).toBe('changed');

    await page.click('#removeAll');
    expect(await page.$$eval('ul > li', (elements) => elements.length)).toBe(0);

    await page.click('#submit');
    state = await page.$eval('#result', (el) =>
      JSON.parse(el.textContent ?? ''),
    );
    expect(state).toEqual({ data: [] });

    await page.click('#append');
    await page.click('#append');
    await page.click('#append');

    await page.click('#removeAsync');
    await page.click('#removeAsync');

    const inputsCount = await page.$$eval(
      'input',
      (elements) => elements.length,
    );
    expect(inputsCount).toBe(1);

    await page.click('#submit');
    state = await page.$eval('#result', (el) =>
      JSON.parse(el.textContent ?? ''),
    );
    expect(state).toEqual({ data: [{ name: '41' }] });

    const renderCount = await page.$eval(
      '#renderCount',
      (el) => el.textContent,
    );
    expect(renderCount).toBe('54');
  });

  test('should behaviour correctly with defaultValue', async ({ page }) => {
    await page.goto('http://localhost:3000/useFieldArray/default');

    let listItems = await page.$$('ul > li');
    expect(listItems.length).toBe(3);

    expect(await page.inputValue('ul > li:nth-child(1) input')).toBe('test');
    expect(await page.inputValue('ul > li:nth-child(2) input')).toBe('test1');
    expect(await page.inputValue('ul > li:nth-child(3) input')).toBe('test2');

    await page.click('#append');
    expect(await page.inputValue('ul > li:nth-child(4) input')).toBe('2');

    await page.click('#submit');
    let result = JSON.parse(await page.textContent('#result'));
    expect(result).toEqual({
      data: [
        { name: 'test' },
        { name: 'test1' },
        { name: 'test2' },
        { name: '2' }
      ]
    });

    await page.click('#prepend');
    listItems = await page.$$('ul > li');
    expect(listItems.length).toBe(5);
    expect(await page.inputValue('ul > li:nth-child(1) input')).toBe('7');

    await page.click('#submit');
    result = JSON.parse(await page.textContent('#result'));
    expect(result).toEqual({
      data: [
        { name: '7' },
        { name: 'test' },
        { name: 'test1' },
        { name: 'test2' },
        { name: '2' }
      ]
    });

    await page.click('#swap');
    expect(await page.inputValue('ul > li:nth-child(2) input')).toBe('test1');
    expect(await page.inputValue('ul > li:nth-child(3) input')).toBe('test');

    await page.click('#submit');
    result = JSON.parse(await page.textContent('#result'));
    expect(result).toEqual({
      data: [
        { name: '7' },
        { name: 'test1' },
        { name: 'test' },
        { name: 'test2' },
        { name: '2' }
      ]
    });

    await page.click('#move');
    expect(await page.inputValue('ul > li:nth-child(1) input')).toBe('test');
    expect(await page.inputValue('ul > li:nth-child(2) input')).toBe('7');

    await page.click('#submit');
    result = JSON.parse(await page.textContent('#result'));
    expect(result).toEqual({
      data: [
        { name: 'test' },
        { name: '7' },
        { name: 'test1' },
        { name: 'test2' },
        { name: '2' }
      ]
    });

    await page.click('#insert');
    expect(await page.inputValue('ul > li:nth-child(2) input')).toBe('20');

    await page.click('#submit');
    result = JSON.parse(await page.textContent('#result'));
    expect(result).toEqual({
      data: [
        { name: 'test' },
        { name: '20' },
        { name: '7' },
        { name: 'test1' },
        { name: 'test2' },
        { name: '2' }
      ]
    });

    await page.click('#remove');
    expect(await page.inputValue('ul > li:nth-child(1) input')).toBe('test');
    expect(await page.inputValue('ul > li:nth-child(2) input')).toBe('7');

    await page.click('#submit');
    result = JSON.parse(await page.textContent('#result'));
    expect(result).toEqual({
      data: [
        { name: 'test' },
        { name: '7' },
        { name: 'test1' },
        { name: 'test2' },
        { name: '2' }
      ]
    });

    await page.click('#delete2');
    listItems = await page.$$('ul > li');
    expect(listItems.length).toBe(4);
    expect(await page.inputValue('ul > li:nth-child(1) input')).toBe('test');
    expect(await page.inputValue('ul > li:nth-child(2) input')).toBe('7');
    expect(await page.inputValue('ul > li:nth-child(3) input')).toBe('test2');
    expect(await page.inputValue('ul > li:nth-child(4) input')).toBe('2');

    await page.click('#delete3');
    listItems = await page.$$('ul > li');
    expect(listItems.length).toBe(3);

    await page.click('#submit');
    result = JSON.parse(await page.textContent('#result'));
    expect(result).toEqual({
      data: [{ name: 'test' }, { name: '7' }, { name: 'test2' }]
    });

    await page.click('#removeAll');
    listItems = await page.$$('ul > li');
    expect(listItems.length).toBe(0);

    await page.click('#submit');
    result = JSON.parse(await page.textContent('#result'));
    expect(result).toEqual({
      data: []
    });

    await page.click('#append');
    expect(await page.inputValue('ul > li:nth-child(1) input')).toBe('38');

    await page.click('#prepend');
    expect(await page.inputValue('ul > li:nth-child(1) input')).toBe('40');

    const renderCount = await page.textContent('#renderCount');
    expect(renderCount).toBe('41');
  });

  test('should behaviour correctly with defaultValue and without auto focus', async ({
    page
  }) => {
    await page.goto(
      'http://localhost:3000/useFieldArray/defaultAndWithoutFocus',
    );

    let listItems = await page.$$('ul > li');
    expect(listItems.length).toBe(3);

    expect(await page.inputValue('ul > li:nth-child(1) > input')).toBe('test');
    expect(await page.inputValue('ul > li:nth-child(2) > input')).toBe('test1');
    expect(await page.inputValue('ul > li:nth-child(3) > input')).toBe('test2');

    await page.click('#append');
    expect(await page.inputValue('ul > li:nth-child(4) > input')).toBe('2');

    await page.click('#submit');
    let result = JSON.parse(await page.textContent('#result'));
    expect(result).toEqual({
      data: [
        { name: 'test' },
        { name: 'test1' },
        { name: 'test2' },
        { name: '2' },
      ],
    });

    await page.click('#prepend');
    listItems = await page.$$('ul > li');
    expect(listItems.length).toBe(5);
    expect(await page.inputValue('ul > li:nth-child(1) > input')).toBe('6');

    await page.click('#submit');
    result = JSON.parse(await page.textContent('#result'));
    expect(result).toEqual({
      data: [
        { name: '6' },
        { name: 'test' },
        { name: 'test1' },
        { name: 'test2' },
        { name: '2' },
      ],
    });

    await page.click('#swap');
    expect(await page.inputValue('ul > li:nth-child(2) > input')).toBe('test1');
    expect(await page.inputValue('ul > li:nth-child(3) > input')).toBe('test');

    await page.click('#submit');
    result = JSON.parse(await page.textContent('#result'));
    expect(result).toEqual({
      data: [
        { name: '6' },
        { name: 'test1' },
        { name: 'test' },
        { name: 'test2' },
        { name: '2' },
      ],
    });

    await page.click('#move');
    expect(await page.inputValue('ul > li:nth-child(1) > input')).toBe('test');
    expect(await page.inputValue('ul > li:nth-child(2) > input')).toBe('6');

    await page.click('#submit');
    result = JSON.parse(await page.textContent('#result'));
    expect(result).toEqual({
      data: [
        { name: 'test' },
        { name: '6' },
        { name: 'test1' },
        { name: 'test2' },
        { name: '2' },
      ],
    });

    await page.click('#insert');
    expect(await page.inputValue('ul > li:nth-child(2) > input')).toBe('18');

    await page.click('#submit');
    result = JSON.parse(await page.textContent('#result'));
    expect(result).toEqual({
      data: [
        { name: 'test' },
        { name: '18' },
        { name: '6' },
        { name: 'test1' },
        { name: 'test2' },
        { name: '2' },
      ],
    });

    await page.click('#remove');
    expect(await page.inputValue('ul > li:nth-child(1) > input')).toBe('test');
    expect(await page.inputValue('ul > li:nth-child(2) > input')).toBe('6');

    await page.click('#submit');
    result = JSON.parse(await page.textContent('#result'));
    expect(result).toEqual({
      data: [
        { name: 'test' },
        { name: '6' },
        { name: 'test1' },
        { name: 'test2' },
        { name: '2' },
      ],
    });

    await page.click('#delete2');
    listItems = await page.$$('ul > li');
    expect(listItems.length).toBe(4);
    expect(await page.inputValue('ul > li:nth-child(1) > input')).toBe('test');
    expect(await page.inputValue('ul > li:nth-child(2) > input')).toBe('6');
    expect(await page.inputValue('ul > li:nth-child(3) > input')).toBe('test2');
    expect(await page.inputValue('ul > li:nth-child(4) > input')).toBe('2');

    await page.click('#delete3');
    listItems = await page.$$('ul > li');
    expect(listItems.length).toBe(3);

    await page.click('#submit');
    result = JSON.parse(await page.textContent('#result'));
    expect(result).toEqual({
      data: [{ name: 'test' }, { name: '6' }, { name: 'test2' }],
    });

    await page.click('#removeAll');
    listItems = await page.$$('ul > li');
    expect(listItems.length).toBe(0);

    await page.click('#submit');
    result = JSON.parse(await page.textContent('#result'));
    expect(result).toEqual({
      data: [],
    });

    await page.click('#append');
    expect(await page.inputValue('ul > li:nth-child(1) > input')).toBe('35');

    await page.click('#prepend');
    expect(await page.inputValue('ul > li:nth-child(1) > input')).toBe('36');

    expect(await page.textContent('#renderCount')).toBe('37');
  });

  test.skip('should replace fields with new values', async ({ page }) => {
    await page.click('#replace');
    await expect(page.locator('ul > li:nth-child(1) input')).toHaveValue(
      '37. lorem',
    );
    await expect(page.locator('ul > li:nth-child(2) input')).toHaveValue(
      '37. ipsum',
    );
    await expect(page.locator('ul > li:nth-child(3) input')).toHaveValue(
      '37. dolor',
    );
    await expect(page.locator('ul > li:nth-child(4) input')).toHaveValue(
      '37. sit amet',
    );

    await page.click('#submit');
    const result = await page.$eval('#result', (el) =>
      JSON.parse(el.textContent ?? ''),
    );
    expect(result).toEqual({
      data: [
        { name: '37. lorem' },
        { name: '37. ipsum' },
        { name: '37. dolor' },
        { name: '37. sit amet' },
      ],
    });
  });

  test('should display the correct dirty value with default value - #1', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/useFieldArray/default');
    await expect(page.locator('#dirty').textContent()).resolves.toBe('no');
    await page.click('#update');
    let dirtyFields = await page.$eval('#dirtyFields', (el) =>
      JSON.parse(el.textContent ?? '')
    );
    expect(dirtyFields).toEqual({
      data: [{ name: true }, { name: false }, { name: false }]
    });
    await expect(page.locator('#dirty').textContent()).resolves.toBe('yes');
    await page.click('#updateRevert');
    await expect(page.locator('#dirty').textContent()).resolves.toBe('no');
    await page.click('#append');
    await page.fill('#field1', 'test');
    await page.click('#prepend');
    await page.click('#delete2');
    dirtyFields = await page.$eval('#dirtyFields', (el) =>
      JSON.parse(el.textContent ?? '')
    );
    expect(dirtyFields).toEqual({
      data: [{ name: true }, { name: true }, { name: false }, { name: true }]
    });
    await page.click('#delete2');
    dirtyFields = await page.$eval('#dirtyFields', (el) =>
      JSON.parse(el.textContent ?? '')
    );
    expect(dirtyFields).toEqual({
      data: [{ name: true }, { name: true }, { name: true }]
    });
    await page.click('#delete1');
    dirtyFields = await page.$eval('#dirtyFields', (el) =>
      JSON.parse(el.textContent ?? '')
    );
    expect(dirtyFields).toEqual({
      data: [{ name: true }, { name: true }, { name: true }]
    });
    await page.click('#delete1');
    dirtyFields = await page.$eval('#dirtyFields', (el) =>
      JSON.parse(el.textContent ?? '')
    );
    expect(dirtyFields).toEqual({
      data: [{ name: true }, { name: true }, { name: true }]
    });
    await page.click('#delete0');
    dirtyFields = await page.$eval('#dirtyFields', (el) =>
      JSON.parse(el.textContent ?? '')
    );
    expect(dirtyFields).toEqual({
      data: [{ name: true }, { name: true }, { name: true }]
    });
    await expect(page.locator('#dirty').textContent()).resolves.toBe('yes');
    await expect(page.locator('#renderCount').textContent()).resolves.toBe(
      '15'
    );
  });

  test.skip('should display the correct dirty value without default value', async ({
    page
  }) => {
    await page.goto('http://localhost:3000/useFieldArray/normal');
    await expect(page.locator('#dirty').textContent()).toBe('no');
    await page.click('#append');
    await expect(page.locator('#dirty').textContent()).toBe('yes');
    await page.focus('#field0');
    await page.press('#field0', 'Tab');

    let dirtyFields = await page.$eval('#dirtyFields', (el) =>
      JSON.parse(el.textContent ?? ''),
    );
    expect(dirtyFields).toEqual({ data: [{ name: true }] });

    await expect(page.locator('#dirty').textContent()).toBe('yes');
    await page.fill('#field0', 'test');
    await page.press('#field0', 'Tab');
    await expect(page.locator('#dirty').textContent()).toBe('yes');
    await page.click('#prepend');
    await page.click('#prepend');

    dirtyFields = await page.$eval('#dirtyFields', (el) =>
      JSON.parse(el.textContent ?? ''),
    );
    expect(dirtyFields).toEqual({
      data: [{ name: true }, { name: true }, { name: true }],
    });

    await page.click('#delete0');

    dirtyFields = await page.$eval('#dirtyFields', (el) =>
      JSON.parse(el.textContent ?? ''),
    );
    expect(dirtyFields).toEqual({ data: [{ name: true }, { name: true }] });

    await page.click('#delete1');

    dirtyFields = await page.$eval('#dirtyFields', (el) =>
      JSON.parse(el.textContent ?? ''),
    );
    expect(dirtyFields).toEqual({ data: [{ name: true }] });

    await page.click('#delete0');

    dirtyFields = await page.$eval('#dirtyFields', (el) =>
      JSON.parse(el.textContent ?? ''),
    );
    expect(dirtyFields).toEqual({ data: [] });

    await expect(page.locator('#dirty').textContent()).toBe('yes');
  });

  test.skip('should display the correct dirty value with default value', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/useFieldArray/default');
    await expect(page.locator('#dirty')).toHaveText('no');
    await page.focus('#field0');
    await page.press('#field0', 'Tab');
    await expect(page.locator('#dirty')).toHaveText('no');
    await page.fill('#field0', 'test');
    await expect(page.locator('#dirty')).toHaveText('yes');
    await page.press('#field0', 'Tab');
    await expect(page.locator('#dirty')).toHaveText('yes');
    await page.focus('#field0');
    await page.press('#field0', 'Tab');
    await expect(page.locator('#dirty')).toHaveText('yes');
    await page.fill('#field0', '');
    await page.fill('#field0', 'test');
    await expect(page.locator('#dirty')).toHaveText('no');
    await page.click('#delete1');
    await expect(page.locator('#dirty')).toHaveText('yes');
    await page.click('#append');
    await page.fill('#field0', '');
    await page.fill('#field0', 'test');
    await page.fill('#field1', '');
    await page.fill('#field1', 'test1');
    await page.fill('#field2', '');
    await page.fill('#field2', 'test2');
    await expect(page.locator('#dirty')).toHaveText('no');
  });

  test.skip('should display the correct dirty value with async default value', async ({
    page
  }) => {
    await page.goto('http://localhost:3000/useFieldArray/asyncReset');
    await expect(page.locator('#dirty')).toHaveText('no');
    await page.focus('#field0');
    await page.press('#field0', 'Tab');
    await expect(page.locator('#dirty')).toHaveText('no');
    await page.fill('#field0', 'test');
    await expect(page.locator('#dirty')).toHaveText('yes');
    await page.press('#field0', 'Tab');
    await expect(page.locator('#dirty')).toHaveText('yes');
    await page.focus('#field0');
    await page.press('#field0', 'Tab');
    await expect(page.locator('#dirty')).toHaveText('yes');
    await page.fill('#field0', '');
    await page.fill('#field0', 'test');
    await expect(page.locator('#dirty')).toHaveText('no');
    await page.click('#delete1');
    await expect(page.locator('#dirty')).toHaveText('yes');
    await page.click('#append');
    await page.fill('#field0', '');
    await page.fill('#field0', 'test');
    await page.fill('#field1', '');
    await page.fill('#field1', 'test1');
    await page.fill('#field2', '');
    await page.fill('#field2', 'test2');
    await expect(page.locator('#dirty')).toHaveText('no');
  });

  test('should display correct error with the inputs', async ({ page }) => {
    await page.goto('http://localhost:3000/useFieldArray/default');
    await page.click('#prepend');
    await page.fill('#field1', '');
    await page.fill('#field2', '');
    await page.fill('#field3', '');
    await page.click('#append');
    await page.click('#submit');
    expect(await page.textContent('#error1')).toBe('This is required');
    expect(await page.textContent('#error2')).toBe('This is required');
    expect(await page.textContent('#error3')).toBe('This is required');
    await page.fill('#field1', 'test');
    expect(await page.$('#error1')).toBeNull();
    expect(await page.textContent('#error2')).toBe('This is required');
    expect(await page.textContent('#error3')).toBe('This is required');
    await page.click('#move');
    expect(await page.textContent('#error0')).toBe('This is required');
    expect(await page.$('#error2')).toBeNull();
    await page.click('#prepend');
    expect(await page.$('#error0')).toBeNull();
    expect(await page.textContent('#error1')).toBe('This is required');
  });

  test('should return correct touched values', async ({ page }) => {
    await page.goto('http://localhost:3000/useFieldArray/default');

    await page.fill('#field0', '1');
    await page.fill('#field1', '1');
    await page.fill('#field2', '1');
    let touched = await page.textContent('#touched');
    expect(touched).toBe('[{"name":true},{"name":true}]');

    await page.click('#append');
    await page.click('#prepend');
    touched = await page.textContent('#touched');
    expect(touched).toBe(
      '[null,{"name":true},{"name":true},{"name":true},{"name":true}]',
    );

    await page.click('#insert');
    touched = await page.textContent('#touched');
    expect(touched).toBe(
      '[{"name":true},null,{"name":true},{"name":true},{"name":true},{"name":true}]',
    );

    await page.click('#swap');
    touched = await page.textContent('#touched');
    expect(touched).toBe(
      '[{"name":true},{"name":true},{"name":true},{"name":true},{"name":true},{"name":true}]',
    );

    await page.click('#move');
    touched = await page.textContent('#touched');
    expect(touched).toBe(
      '[{"name":true},{"name":true},{"name":true},{"name":true},{"name":true},{"name":true}]',
    );

    await page.click('#insert');
    touched = await page.textContent('#touched');
    expect(touched).toBe(
      '[{"name":true},null,{"name":true},{"name":true},{"name":true},{"name":true},{"name":true}]',
    );

    await page.click('#delete4');
    touched = await page.textContent('#touched');
    expect(touched).toBe(
      '[{"name":true},{"name":true},{"name":true},{"name":true},{"name":true},{"name":true}]',
    );
  });

  test('should return correct touched values without autoFocus', async ({
    page,
  }) => {
    await page.goto(
      'http://localhost:3000/useFieldArray/defaultAndWithoutFocus',
    );
    await page.fill('#field0', '1');
    await page.fill('#field1', '1');
    await page.fill('#field2', '1');
    let touched = await page.textContent('#touched');
    expect(touched).toBe('[{"name":true},{"name":true}]');
    await page.click('#append');
    await page.click('#prepend');
    touched = await page.textContent('#touched');
    expect(touched).toBe(
      '[null,{"name":true},{"name":true},{"name":true},null]'
    );
    await page.click('#insert');
    touched = await page.textContent('#touched');
    expect(touched).toBe(
      '[null,null,{"name":true},{"name":true},{"name":true},null]'
    );
    await page.click('#swap');
    touched = await page.textContent('#touched');
    expect(touched).toBe(
      '[null,{"name":true},null,{"name":true},{"name":true},null]'
    );
    await page.click('#move');
    touched = await page.textContent('#touched');
    expect(touched).toBe(
      '[null,null,{"name":true},{"name":true},{"name":true},null]'
    );
    await page.click('#insert');
    touched = await page.textContent('#touched');
    expect(touched).toBe(
      '[null,null,null,{"name":true},{"name":true},{"name":true},null]'
    );
    await page.click('#delete4');
    touched = await page.textContent('#touched');
    expect(touched).toBe('[null,null,null,{"name":true},{"name":true},null]');
  });

  test('should return correct isValid formState', async ({ page }) => {
    await page.goto('http://localhost:3000/useFieldArray/formState');
    let isValid = await page.textContent('#isValid');
    expect(isValid).toBe('yes');

    await page.click('#append');
    await page.click('#append');
    await page.click('#append');

    isValid = await page.textContent('#isValid');
    expect(isValid).toBe('yes');

    await page.fill('#field0', '');

    isValid = await page.textContent('#isValid');
    expect(isValid).toBe('no');

    await page.click('#delete0');
    await page.fill('#field1', '1');

    isValid = await page.textContent('#isValid');
    expect(isValid).toBe('yes');

    await page.fill('#field0', '');

    isValid = await page.textContent('#isValid');
    expect(isValid).toBe('no');

    await page.click('#delete0');

    isValid = await page.textContent('#isValid');
    expect(isValid).toBe('yes');

    await page.click('#append');
    await page.fill('#field0', '');

    isValid = await page.textContent('#isValid');
    expect(isValid).toBe('no');

    await page.click('#delete0');

    isValid = await page.textContent('#isValid');
    expect(isValid).toBe('yes');

    await page.click('#append');
    await page.click('#append');

    await page.fill('#field1', '');
    await page.fill('#field2', '');

    isValid = await page.textContent('#isValid');
    expect(isValid).toBe('no');

    await page.click('#delete1');
    await page.click('#delete1');

    isValid = await page.textContent('#isValid');
    expect(isValid).toBe('yes');
  });
});
