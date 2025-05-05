const { test, expect } = require("@playwright/test");
const { validCredentials, invalidCredentials } = require("../../login.data");

test.describe("Login Feature", () => {
  let browserContext;
  let page;

  test.beforeEach(async ({ browser }) => {
    browserContext = await browser.newContext();
    page = await browserContext.newPage();
    await page.goto("https://the-internet.herokuapp.com/login");
  });

  test.afterEach(async () => {
    await browserContext.close();
  });

  test("Login using valid credentials", async () => {
    await page
      .getByRole("textbox", { name: "username" })
      .fill(validCredentials.username);
    await page
      .getByRole("textbox", { name: "password" })
      .fill(validCredentials.password);
    await page.getByRole("button", { name: "Login" }).click();

    const successMessage = await page.getByText(
      "You logged into a secure area!"
    );
    await expect(successMessage).toBeVisible();

    const logoutbutton = await page.getByRole("link", { name: "Logout" });
    await expect(logoutbutton).toBeVisible();
  });

  test("Login using invalid credentials", async () => {
    await page
      .getByRole("textbox", { name: "username" })
      .fill(invalidCredentials.username);
    await page
      .getByRole("textbox", { name: "password" })
      .fill(invalidCredentials.password);
    await page.getByRole("button", { name: "Login" }).click();

    const message = await page.getByText("Your username is invalid! ×");
    await expect(message).toBeVisible();
  });
});
