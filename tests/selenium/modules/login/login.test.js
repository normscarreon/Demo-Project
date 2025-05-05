const { Builder, Browser } = require("selenium-webdriver");
const LoginPage = require("../../utils/login.util");
const path = require("path");
const fs = require("fs");
const { format } = require("date-fns");
const { expect } = require("chai");
const { validCredentials, invalidCredentials } = require("../../../login.data");

describe("Login Page Tests", function () {
  let driver;
  let loginPage;
  this.timeout(30000);

  before(async function () {
    driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    loginPage = new LoginPage(driver);
  });

  after(async function () {
    await driver.quit();
  });

  it("should log in successfully with valid credentials", async function () {
    await driver.get("https://the-internet.herokuapp.com/login");
    await loginPage.login(validCredentials.username, validCredentials.password);

    expect(await loginPage.getLoginStatus()).to.include(
      "You logged into a secure area!"
    );
  });

  it("should capture screenshot on failure", async function () {
    await driver.get("https://the-internet.herokuapp.com/login");
    await loginPage.login(
      invalidCredentials.username,
      invalidCredentials.password
    );

    try {
      const loginStatus = await loginPage.getLoginStatus();
      expect(loginStatus).to.include("Your username is invalid!");

      console.log("Login failed as expected.");
    } catch (error) {
      console.error("Test failed:", error);

      const screenshotFolder = path.join(__dirname, "./screenshots");
      if (!fs.existsSync(screenshotFolder))
        fs.mkdirSync(screenshotFolder, { recursive: true });

      const screenshot = await driver.takeScreenshot();
      const date = format(new Date(), "yyyy-MM-dd");
      const screenshotPath = path.join(
        screenshotFolder,
        `${date}_test_failure.png`
      );

      fs.writeFileSync(screenshotPath, screenshot, "base64");
      console.log(`Screenshot saved: ${screenshotPath}`);

      throw error;
    }
  });
});
