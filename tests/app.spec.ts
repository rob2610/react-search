import {expect, test} from "@playwright/test";

test('should search and show images', async ({page}) => {
    await page.goto('http://localhost:5173/');
    await page.fill('.input-text', 'tartaruga ninja');
    await page.click('.submit-button');
    await page.waitForSelector('.flex');
    const images = page.locator('.flex-vertical');
    await expect(images).toHaveCount(10);
    const nextPageButton = page.locator('button:has-text("Next page")');
    await expect(nextPageButton).toBeVisible();
})