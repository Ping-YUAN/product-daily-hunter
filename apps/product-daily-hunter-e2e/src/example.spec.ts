import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  expect(await page.locator('title').innerText()).toContain(
    'Product Daily Report'
  );
  // Expect title to contain a substring.
  expect(await page.locator('.product-hunter-report').innerText()).toContain(
    'Product Hunter Report'
  );
});
